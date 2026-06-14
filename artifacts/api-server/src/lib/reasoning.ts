import { chatText, chatJson } from "./ai";
import { logger } from "./logger";
import type { Stage, SkillArea, OpenItem } from "./diagnosticContent";
import {
  OPEN_FALLBACK_CRITICAL,
  OPEN_FALLBACK_ETHICAL,
  JUDGMENT_MCQ_FALLBACK,
} from "./diagnosticContent";

export type ReasoningFormat = "mcq" | "hybrid" | "written";

// Shape of a persisted diagnostic item row (payload/scoring are jsonb).
export interface DiagnosticItemRow {
  id: number;
  position: number;
  type: "dilemma" | "mcq" | "open";
  prompt: string;
  payload: unknown;
  scoring: unknown;
}

// One student response (matches ReasoningResponseInput in the OpenAPI spec).
export interface ResponseInput {
  itemId: number;
  text?: string | null;
  selectedIndex?: number | null;
  decisionIndex?: number | null;
  ratings?: number[] | null;
  ranking?: number[] | null;
}

export interface ReasoningMetric {
  label: string;
  value: string;
  detail?: string | null;
}

// Grade of a single short open-response answer.
export interface OpenGrade {
  correct: boolean;
  rationale: string;
}

export interface ScoreSummary {
  instrument: "ethical" | "critical";
  headline: string;
  metrics: ReasoningMetric[];
  // For MCQ items: the model-judged correct option index per item id,
  // determined independently rather than from the stored answer key.
  // Persisted so a later review shows the same judged answers.
  correctByItem?: Record<number, number>;
  // For open items: the lenient grade per item id. Persisted so a later review
  // shows the same correctness and rationale without re-grading.
  openByItem?: Record<number, OpenGrade>;
}

interface McqScoring {
  correctIndex: number;
  skillArea: SkillArea;
}
interface OpenScoring {
  keyPoints: string[];
  skillArea?: SkillArea;
}
interface DilemmaScoring {
  stages: Stage[];
  rankCount: number;
}
interface DilemmaPayload {
  decisionOptions: string[];
  considerations: string[];
  rankCount: number;
}

const SKILL_LABELS: Record<SkillArea, string> = {
  analysis: "Analysis",
  inference: "Inference",
  evaluation: "Evaluation",
  deduction: "Deduction",
  induction: "Induction",
};

// --- Objective (MCQ + open) scoring --------------------------------------
// Used for every format except the Professional Judgment "written" dilemma:
// critical mcq/hybrid/written and ethical mcq/hybrid. Each MCQ and each open
// answer counts equally toward an overall correct-out-of-total score, with a
// per-skill breakdown when items carry a skill area.

function scoreObjective(
  instrument: "ethical" | "critical",
  items: DiagnosticItemRow[],
  responses: ResponseInput[],
  judged: Map<number, number>,
  openGrades: Map<number, OpenGrade>,
): ScoreSummary {
  const byItem = new Map(responses.map((r) => [r.itemId, r]));
  let correct = 0;
  let total = 0;
  const perSkill = new Map<SkillArea, { correct: number; total: number }>();
  const correctByItem: Record<number, number> = {};
  const openByItem: Record<number, OpenGrade> = {};

  const bumpSkill = (skill: SkillArea | undefined, ok: boolean) => {
    if (!skill) return;
    const bucket = perSkill.get(skill) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    if (ok) bucket.correct += 1;
    perSkill.set(skill, bucket);
  };

  for (const item of items) {
    if (item.type === "mcq") {
      total += 1;
      const scoring = item.scoring as McqScoring;
      const correctIndex = judged.get(item.id) ?? scoring.correctIndex;
      correctByItem[item.id] = correctIndex;
      const resp = byItem.get(item.id);
      const ok = !!resp && resp.selectedIndex === correctIndex;
      if (ok) correct += 1;
      bumpSkill(scoring.skillArea, ok);
    } else if (item.type === "open") {
      total += 1;
      const grade = openGrades.get(item.id);
      const ok = grade?.correct ?? false;
      openByItem[item.id] = {
        correct: ok,
        rationale: grade?.rationale ?? "",
      };
      if (ok) correct += 1;
      bumpSkill((item.scoring as OpenScoring).skillArea, ok);
    }
  }

  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const metrics: ReasoningMetric[] = [
    { label: "Overall", value: `${correct} / ${total} (${percent}%)` },
  ];
  for (const skill of Object.keys(SKILL_LABELS) as SkillArea[]) {
    const b = perSkill.get(skill);
    if (!b) continue;
    metrics.push({ label: SKILL_LABELS[skill], value: `${b.correct} / ${b.total}` });
  }

  return {
    instrument,
    headline: `You answered ${correct} of ${total} correctly (${percent}%).`,
    metrics,
    correctByItem,
    openByItem,
  };
}

// Independently determine the genuinely correct option for each MCQ, using the
// model's own reasoning rather than trusting the stored answer key. The stored
// key is passed only as a fallible hint. Returns a map of item id -> correct
// option index; on any failure it falls back to the stored key per item.
export async function judgeCritical(
  items: DiagnosticItemRow[],
): Promise<Map<number, number>> {
  const result = new Map<number, number>();
  const mcq = items.filter((it) => it.type === "mcq");
  for (const it of mcq) {
    result.set(it.id, (it.scoring as McqScoring).correctIndex);
  }
  if (mcq.length === 0) return result;

  try {
    const out = await chatJson<{
      answers: { id: number; correctIndex: number }[];
    }>(
      [
        "You are an expert in critical reasoning, logic, and everyday-judgment analysis. For each multiple-choice question, determine which single option is GENUINELY correct (the most defensible/best answer), reasoning from first principles.",
        "A `hint_index` is provided per question — it is the answer key currently stored in the system, but it MAY BE WRONG. Treat it only as a fallible hint; if your own analysis shows a different option is correct, return that index instead.",
        "Return exactly one 0-based option index per question id.",
        'Output strict JSON {"answers": [{"id": number, "correctIndex": number}]} with one entry for every question id provided.',
      ].join("\n"),
      JSON.stringify({
        questions: mcq.map((it) => ({
          id: it.id,
          question: it.prompt,
          options: (it.payload as { options: string[] }).options,
          hint_index: (it.scoring as McqScoring).correctIndex,
        })),
      }),
    );
    for (const a of out.answers ?? []) {
      const item = mcq.find((it) => it.id === a.id);
      if (!item) continue;
      const optCount = (item.payload as { options: string[] }).options.length;
      if (
        typeof a.correctIndex === "number" &&
        a.correctIndex >= 0 &&
        a.correctIndex < optCount
      ) {
        result.set(a.id, a.correctIndex);
      }
    }
  } catch (err) {
    logger.warn({ err }, "judgeCritical failed; falling back to stored keys");
  }
  return result;
}

// Grade short open-response answers LENIENTLY on substance. A single correct
// core idea earns credit; length, grammar, and style are never penalized. If
// the model is unavailable, fall back to a lenient completion check so a
// submission never blocks. Returns a map of item id -> grade.
export async function gradeOpen(
  items: DiagnosticItemRow[],
  responses: ResponseInput[],
): Promise<Map<number, OpenGrade>> {
  const result = new Map<number, OpenGrade>();
  const open = items.filter((it) => it.type === "open");
  if (open.length === 0) return result;

  const byItem = new Map(responses.map((r) => [r.itemId, r]));
  const questions = open.map((it) => {
    const scoring = it.scoring as OpenScoring;
    const resp = byItem.get(it.id);
    return {
      id: it.id,
      question: it.prompt,
      key_points: scoring.keyPoints ?? [],
      answer: (resp?.text ?? "").trim(),
    };
  });

  // Lenient deterministic fallback (used only if the model is unavailable):
  // credit any genuine on-topic attempt. Length is NEVER a factor — a brief but
  // real answer passes. We only withhold credit when the answer is blank or so
  // trivial it carries no content (e.g. a stray character or pure punctuation).
  for (const q of questions) {
    const hasContent = /[a-zA-Z0-9]/.test(q.answer);
    result.set(q.id, {
      correct: hasContent,
      rationale: hasContent
        ? "Credited for a genuine attempt (automatic grader unavailable; not judged on length)."
        : "No answer was provided.",
    });
  }

  try {
    const out = await chatJson<{
      grades: { id: number; correct: boolean; rationale: string }[];
    }>(
      [
        "You are grading very short (1-2 sentence) open answers LENIENTLY.",
        "For each item you get the question, key_points (the core idea(s) a correct brief answer should capture), and the student's answer.",
        "Mark correct=true if the answer captures the SUBSTANCE of ANY key point, even if stated briefly, informally, with imperfect wording, or covering only one point.",
        "NEVER penalize for length, grammar, spelling, missing examples, or not covering every point — a single correct core idea earns full credit.",
        "Mark correct=false ONLY if the answer is blank, off-topic, or contradicts the key idea.",
        "Give a one-sentence rationale for each.",
        'Output strict JSON {"grades":[{"id":number,"correct":boolean,"rationale":string}]} with one entry per question id.',
      ].join("\n"),
      JSON.stringify({ questions }),
    );
    for (const g of out.grades ?? []) {
      if (typeof g.id === "number" && typeof g.correct === "boolean") {
        const rationale =
          typeof g.rationale === "string" && g.rationale.trim()
            ? g.rationale.trim()
            : g.correct
              ? "Captures the key idea."
              : "Misses the key idea.";
        result.set(g.id, { correct: g.correct, rationale });
      }
    }
  } catch (err) {
    logger.warn({ err }, "gradeOpen failed; using lenient completion fallback");
  }
  return result;
}

// --- Ethical reasoning (DIT-style) scoring --------------------------------
// Principled-reasoning ("P") index: weight the ranked postconventional
// considerations. Top rank gets the most weight; P-index is the share of the
// maximum possible postconventional weight, scaled 0–100. Used only for the
// Professional Judgment "written" dilemma.

function scoreEthical(
  items: DiagnosticItemRow[],
  responses: ResponseInput[],
): ScoreSummary {
  const byItem = new Map(responses.map((r) => [r.itemId, r]));
  let pcWeight = 0;
  let maxWeight = 0;
  let mWeight = 0;
  let pWeight = 0;
  let xRankedHigh = false;
  let totalDilemmas = 0;
  let decided = 0;

  for (const item of items) {
    if (item.type !== "dilemma") continue;
    totalDilemmas += 1;
    const scoring = item.scoring as DilemmaScoring;
    const rankCount = scoring.rankCount;
    const stages = scoring.stages;
    const resp = byItem.get(item.id);

    if (resp && typeof resp.decisionIndex === "number") decided += 1;

    // Weights for the ranked slots: rankCount, rankCount-1, ... 1.
    for (let slot = 0; slot < rankCount; slot++) {
      maxWeight += rankCount - slot;
    }

    const ranking = (resp?.ranking ?? []).slice(0, rankCount);
    ranking.forEach((consIndex, slot) => {
      const weight = rankCount - slot;
      const stage = stages[consIndex];
      if (stage === "PC") pcWeight += weight;
      else if (stage === "M") mWeight += weight;
      else if (stage === "P") pWeight += weight;
      else if (stage === "X") xRankedHigh = true;
    });
  }

  const pIndex = maxWeight > 0 ? Math.round((pcWeight / maxWeight) * 100) : 0;
  const norms = maxWeight > 0 ? Math.round((mWeight / maxWeight) * 100) : 0;
  const personal = maxWeight > 0 ? Math.round((pWeight / maxWeight) * 100) : 0;

  const metrics: ReasoningMetric[] = [
    {
      label: "Principled-judgment index",
      value: `${pIndex} / 100`,
      detail: "Weight you gave to principle-based considerations when ranking.",
    },
    { label: "Maintaining-norms emphasis", value: `${norms}%` },
    { label: "Personal-interest emphasis", value: `${personal}%` },
    {
      label: "Scenarios decided",
      value: `${decided} / ${totalDilemmas}`,
    },
  ];
  if (xRankedHigh) {
    metrics.push({
      label: "Reliability check",
      value: "Review",
      detail:
        "A non-substantive consideration was ranked among your top items — read each consideration carefully.",
    });
  }

  return {
    instrument: "ethical",
    headline:
      pIndex >= 60
        ? `Your principled-judgment index is ${pIndex}/100 — you weighted principle-based considerations heavily.`
        : `Your principled-judgment index is ${pIndex}/100.`,
    metrics,
  };
}

export function scoreAssessment(
  instrument: "ethical" | "critical",
  items: DiagnosticItemRow[],
  responses: ResponseInput[],
  judged?: Map<number, number>,
  openGrades?: Map<number, OpenGrade>,
): ScoreSummary {
  // The rate-and-rank dilemma uses the principled-judgment index; every other
  // format (any mix of mcq + open) uses objective correct-out-of-total scoring.
  const allDilemma =
    items.length > 0 && items.every((it) => it.type === "dilemma");
  if (allDilemma) return scoreEthical(items, responses);
  return scoreObjective(
    instrument,
    items,
    responses,
    judged ?? new Map(),
    openGrades ?? new Map(),
  );
}

// --- Written feedback (AI with deterministic fallback) --------------------
// Feedback style is chosen by the SHAPE of the result (objective vs principled),
// not the instrument, so an MCQ-only Professional Judgment attempt still gets
// objective feedback.

type FeedbackStyle = "objective" | "principled";

function deterministicFeedback(
  style: FeedbackStyle,
  summary: ScoreSummary,
): string {
  if (style === "objective") {
    const overall = summary.metrics.find((m) => m.label === "Overall");
    const weak = summary.metrics
      .filter((m) => m.label !== "Overall")
      .filter((m) => {
        const [c, t] = m.value.split(" / ").map((n) => parseInt(n, 10));
        return Number.isFinite(c) && Number.isFinite(t) && t > 0 && c / t < 0.5;
      })
      .map((m) => m.label);
    const weakLine =
      weak.length > 0
        ? ` Your strongest opportunity for growth is in ${weak.join(", ")}; revisit how to spot assumptions and what conclusions the evidence actually licenses.`
        : " Your reasoning was solid across the items.";
    return `Thank you for completing this assessment. ${overall?.value ? `You scored ${overall.value}.` : ""}${weakLine} Remember that a strong answer follows only from the reasons given — distinguish what is stated, what is assumed, and what is merely plausible.`;
  }
  const p = summary.metrics.find((m) => m.label.startsWith("Principled"));
  return `Thank you for working through this everyday-judgment scenario. ${p ? `Your principled-judgment index was ${p.value}.` : ""} A high index means you gave the most weight to considerations about honesty, fairness, and the people affected by your choice rather than to convenience or self-interest. There is no single correct answer here — what matters is whether your decision rests on reasons you could defend to anyone affected by it.`;
}

export async function generateFeedback(
  style: FeedbackStyle,
  assessmentTitle: string,
  summary: ScoreSummary,
): Promise<string> {
  const metricsText = summary.metrics
    .map((m) => `- ${m.label}: ${m.value}${m.detail ? ` (${m.detail})` : ""}`)
    .join("\n");
  const system =
    style === "principled"
      ? "You are an instructor giving warm, specific feedback on a student's professional-judgment self-assessment about a realistic everyday-judgment scenario. 2-4 sentences. Explain what their principled-judgment index reflects and offer one concrete way to deepen their reasoning. Do not invent numbers; use only the metrics provided. Plain prose, no markdown headings."
      : "You are a critical-thinking instructor giving warm, specific feedback on a student's reasoning assessment. 2-4 sentences. Note overall performance and the skill areas to strengthen, using only the metrics provided. Plain prose, no markdown headings.";
  const user = `Assessment: ${assessmentTitle}\nResult summary: ${summary.headline}\nMetrics:\n${metricsText}`;
  try {
    const text = await chatText(system, user);
    if (text && text.length > 20) return text;
  } catch {
    // fall through to deterministic feedback
  }
  return deterministicFeedback(style, summary);
}

// Choose the feedback style from a computed summary.
export function feedbackStyleFor(summary: ScoreSummary): FeedbackStyle {
  return summary.metrics.some((m) => m.label === "Overall")
    ? "objective"
    : "principled";
}

// --- Per-attempt item generation ----------------------------------------
// Every attempt (first take or retake) generates a fresh set of items tailored
// to the picked answer format. If the model is unavailable or returns an
// unusable shape, we fall back to static content so an attempt never blocks.

// Content of an item ready to be inserted (no id / attemptId / position yet).
export interface GeneratedItemContent {
  type: "dilemma" | "mcq" | "open";
  prompt: string;
  payload: unknown;
  scoring: unknown;
}

const STAGE_SET: Stage[] = ["P", "M", "PC", "X"];

export function normalizeFormat(
  instrument: "ethical" | "critical",
  format?: string | null,
): ReasoningFormat {
  if (format === "mcq" || format === "hybrid" || format === "written") {
    return format;
  }
  // Classic defaults: critical was MCQ-only; ethical was the dilemma.
  return instrument === "ethical" ? "written" : "mcq";
}

function rotateOptions(options: string[]): { options: string[]; correctIndex: number } {
  const n = options.length;
  const off = Math.floor(Math.random() * n);
  const rotated = new Array<string>(n);
  for (let k = 0; k < n; k++) {
    rotated[(k + off) % n] = options[k]!;
  }
  return { options: rotated, correctIndex: off };
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

// Return the template items as insertable content (used inside static fallbacks).
function templateContent(items: DiagnosticItemRow[]): GeneratedItemContent[] {
  return items.map((it) => ({
    type: it.type,
    prompt: it.prompt,
    payload: it.payload,
    scoring: it.scoring,
  }));
}

const openItemContent = (o: OpenItem): GeneratedItemContent => ({
  type: "open",
  prompt: o.prompt,
  payload: {},
  scoring: { keyPoints: o.keyPoints, skillArea: o.skillArea } satisfies OpenScoring,
});

const mcqBankContent = (m: {
  prompt: string;
  options: string[];
  skillArea: SkillArea;
}): GeneratedItemContent => {
  const { options, correctIndex } = rotateOptions(m.options);
  return {
    type: "mcq",
    prompt: m.prompt,
    payload: { options },
    scoring: { correctIndex, skillArea: m.skillArea } satisfies McqScoring,
  };
};

// Generate fresh critical-reasoning MCQs for the given ordered skill areas.
async function generateMcqItems(
  skills: SkillArea[],
  examplePrompts: string[],
): Promise<GeneratedItemContent[]> {
  if (skills.length === 0) return [];
  const system =
    "You are an assessment author writing ORIGINAL critical-thinking multiple-choice questions. " +
    "Each question must measure reasoning (not recall), have exactly four answer options with one unambiguously best answer, and target the requested skill area. " +
    "List the CORRECT option FIRST, followed by three plausible but wrong distractors. " +
    "Write fresh questions on varied everyday topics — do NOT reuse the example wording. " +
    'Respond ONLY as JSON of the form {"items":[{"prompt":"...","options":["correct","wrong","wrong","wrong"],"skillArea":"analysis"}]}.';
  const user =
    `Write ${skills.length} new questions, one per skill area in THIS exact order: ${JSON.stringify(skills)}.\n` +
    `Skill areas mean: analysis (identify assumptions/claims/conclusions), inference (what the evidence supports), evaluation (judge argument quality/sources), deduction (what necessarily follows), induction (strength of generalization/causal/analogy).\n` +
    `For style only (do NOT copy these): ${JSON.stringify(examplePrompts)}.`;
  const out = await chatJson<{
    items?: { prompt?: unknown; options?: unknown; skillArea?: unknown }[];
  }>(system, user);
  const raw = out.items;
  if (!Array.isArray(raw) || raw.length !== skills.length) {
    throw new Error("mcq items: wrong item count");
  }
  return raw.map((q, i) => {
    const expectedSkill = skills[i]!;
    const prompt = q.prompt;
    const options = q.options;
    if (typeof prompt !== "string" || prompt.trim().length < 8) {
      throw new Error("mcq items: bad prompt");
    }
    if (
      !Array.isArray(options) ||
      options.length !== 4 ||
      !options.every((o) => typeof o === "string" && o.trim().length > 0)
    ) {
      throw new Error("mcq items: bad options");
    }
    const { options: rotated, correctIndex } = rotateOptions(options as string[]);
    return {
      type: "mcq" as const,
      prompt: prompt.trim(),
      payload: { options: rotated },
      scoring: { correctIndex, skillArea: expectedSkill },
    };
  });
}

// Generate fresh everyday-judgment MCQs (Professional Judgment, no typing).
async function generateJudgmentMcqItems(
  count: number,
): Promise<GeneratedItemContent[]> {
  const system =
    "You are an assessment author writing ORIGINAL everyday ethical-judgment multiple-choice questions. " +
    "Each presents a brief, realistic scenario about a named person facing a choice involving honesty, fairness, privacy, or responsibility, then asks for the most defensible action OR the strongest reason. " +
    "Exactly four options, with one clearly best answer. List the CORRECT option FIRST, then three plausible but weaker options. " +
    'Respond ONLY as JSON {"items":[{"prompt":"...","options":["correct","wrong","wrong","wrong"]}]}.';
  const user = `Write ${count} new, distinct scenario questions covering varied everyday situations.`;
  const out = await chatJson<{
    items?: { prompt?: unknown; options?: unknown }[];
  }>(system, user);
  const raw = out.items;
  if (!Array.isArray(raw) || raw.length !== count) {
    throw new Error("judgment mcq: wrong item count");
  }
  return raw.map((q) => {
    const prompt = q.prompt;
    const options = q.options;
    if (typeof prompt !== "string" || prompt.trim().length < 8) {
      throw new Error("judgment mcq: bad prompt");
    }
    if (
      !Array.isArray(options) ||
      options.length !== 4 ||
      !options.every((o) => typeof o === "string" && o.trim().length > 0)
    ) {
      throw new Error("judgment mcq: bad options");
    }
    const { options: rotated, correctIndex } = rotateOptions(options as string[]);
    return {
      type: "mcq" as const,
      prompt: prompt.trim(),
      payload: { options: rotated },
      scoring: { correctIndex, skillArea: "evaluation" as SkillArea },
    };
  });
}

// Generate fresh short open-response questions (1-2 sentence answers). For the
// "critical" domain each item targets a skill area; for "ethical" each is an
// everyday-judgment situation. The order of `skills` sets the count.
async function generateOpenItems(
  domain: "critical" | "ethical",
  skills: (SkillArea | undefined)[],
): Promise<GeneratedItemContent[]> {
  const count = skills.length;
  if (count === 0) return [];
  const system =
    "You are an assessment author writing ORIGINAL very short open-response questions that can be answered in ONE or TWO sentences. " +
    (domain === "critical"
      ? "Each targets a critical-reasoning skill and asks the student to briefly explain their reasoning. "
      : "Each presents a brief everyday situation involving honesty, fairness, privacy, or responsibility and asks what the person should do and why, in one sentence. ") +
    "For each question also provide key_points: the 1-3 core ideas a correct brief answer should capture. " +
    'Respond ONLY as JSON {"items":[{"prompt":"...","keyPoints":["..."]}]}.';
  const user =
    domain === "critical"
      ? `Write ${count} questions, one per skill in THIS exact order: ${JSON.stringify(skills)}.`
      : `Write ${count} new, distinct questions covering varied everyday situations.`;
  const out = await chatJson<{
    items?: { prompt?: unknown; keyPoints?: unknown }[];
  }>(system, user);
  const raw = out.items;
  if (!Array.isArray(raw) || raw.length !== count) {
    throw new Error("open items: wrong item count");
  }
  return raw.map((q, i) => {
    const prompt = q.prompt;
    const keyPoints = q.keyPoints;
    if (typeof prompt !== "string" || prompt.trim().length < 8) {
      throw new Error("open items: bad prompt");
    }
    if (
      !Array.isArray(keyPoints) ||
      keyPoints.length === 0 ||
      !keyPoints.every((k) => typeof k === "string" && k.trim().length > 0)
    ) {
      throw new Error("open items: bad keyPoints");
    }
    return {
      type: "open" as const,
      prompt: prompt.trim(),
      payload: {},
      scoring: {
        keyPoints: (keyPoints as string[]).map((k) => k.trim()),
        skillArea: skills[i],
      } satisfies OpenScoring,
    };
  });
}

async function generateEthicalVariant(
  items: DiagnosticItemRow[],
): Promise<GeneratedItemContent[]> {
  const dilemma = items.find((it) => it.type === "dilemma");
  if (!dilemma) throw new Error("ethical variant: no template dilemma");
  const scoring = dilemma.scoring as DilemmaScoring;
  const payload = dilemma.payload as DilemmaPayload;
  // Shuffle the stage order so the new item maps stages to different slots.
  const stages = shuffle(scoring.stages);
  const considerationCount = stages.length;
  const decisionCount = payload.decisionOptions.length;
  const system =
    "You are an assessment author writing an ORIGINAL everyday-judgment scenario. " +
    "Produce a realistic, self-contained scenario about a named person (e.g. a student, a friend, a teammate) facing a hard decision where legitimate considerations conflict — think honesty, fairness, loyalty, privacy, peer pressure, or owning up to a mistake. Then write a set of considerations someone might weigh. " +
    "Each consideration is tagged with a hidden stage you must honor:\n" +
    "- P = appeals to the decider's personal interest, image, convenience, or job security\n" +
    "- M = appeals to company policy, rules, a manager's request, or one's formal role (maintaining norms)\n" +
    "- PC = appeals to impartial principles: honesty, fairness, and the rights and interests of everyone affected by the decision (principled)\n" +
    "- X = a nonsensical or irrelevant statement that sounds sophisticated but says nothing (a reliability check)\n" +
    "Write a DISTINCT scenario from any example. " +
    'Respond ONLY as JSON: {"prompt":"scenario text ending with the yes/no decision question","decisionOptions":["do X","Can\'t decide","do opposite"],"considerations":[{"text":"...","stage":"PC"}]}.';
  const user =
    `Write ONE new scenario with exactly ${decisionCount} decision options (the middle one should be "Can't decide") ` +
    `and exactly ${considerationCount} considerations whose stages, IN THIS ORDER, are: ${JSON.stringify(stages)}.\n` +
    `Each consideration's "stage" must match the stage at its position. Make each consideration a single clause a person might weigh.\n` +
    `For style only (do NOT copy it): ${JSON.stringify(dilemma.prompt.slice(0, 200))}`;
  const out = await chatJson<{
    prompt?: unknown;
    decisionOptions?: unknown;
    considerations?: { text?: unknown; stage?: unknown }[];
  }>(system, user);
  const prompt = out.prompt;
  const decisionOptions = out.decisionOptions;
  const cons = out.considerations;
  if (typeof prompt !== "string" || prompt.trim().length < 40) {
    throw new Error("ethical variant: bad prompt");
  }
  if (
    !Array.isArray(decisionOptions) ||
    decisionOptions.length !== decisionCount ||
    !decisionOptions.every((o) => typeof o === "string" && o.trim().length > 0)
  ) {
    throw new Error("ethical variant: bad decisionOptions");
  }
  if (!Array.isArray(cons) || cons.length !== considerationCount) {
    throw new Error("ethical variant: wrong consideration count");
  }
  const texts: string[] = [];
  const outStages: Stage[] = [];
  cons.forEach((c, i) => {
    const text = c.text;
    if (typeof text !== "string" || text.trim().length < 4) {
      throw new Error("ethical variant: bad consideration text");
    }
    // Trust the requested stage order; honor the model's only if valid & equal.
    const stage = STAGE_SET.includes(c.stage as Stage)
      ? (c.stage as Stage)
      : stages[i]!;
    texts.push(text.trim());
    outStages.push(stage);
  });
  // Guarantee the stage multiset is preserved even if the model relabeled some.
  const want = [...stages].sort().join(",");
  const got = [...outStages].sort().join(",");
  const finalStages = want === got ? outStages : stages;
  return [
    {
      type: "dilemma",
      prompt: prompt.trim(),
      payload: {
        decisionOptions: decisionOptions.map((o) => (o as string).trim()),
        considerations: texts,
        rankCount: scoring.rankCount,
      },
      scoring: { stages: finalStages, rankCount: scoring.rankCount },
    },
  ];
}

const ALL_SKILLS = Object.keys(SKILL_LABELS) as SkillArea[];

// Static fallback composition per (instrument, format) so an attempt is never
// blocked when AI generation is unavailable.
function staticFallback(
  instrument: "ethical" | "critical",
  format: ReasoningFormat,
  template: DiagnosticItemRow[],
): GeneratedItemContent[] {
  if (instrument === "critical") {
    const tmplMcq = template.filter((it) => it.type === "mcq");
    if (format === "mcq") return templateContent(tmplMcq);
    if (format === "hybrid") {
      return [
        ...templateContent(tmplMcq.slice(0, 8)),
        ...OPEN_FALLBACK_CRITICAL.slice(0, 2).map(openItemContent),
      ];
    }
    return OPEN_FALLBACK_CRITICAL.slice(0, 5).map(openItemContent); // written
  }
  // ethical
  if (format === "written") return templateContent(template); // the dilemma
  if (format === "mcq") {
    return JUDGMENT_MCQ_FALLBACK.slice(0, 6).map(mcqBankContent);
  }
  return [
    ...JUDGMENT_MCQ_FALLBACK.slice(0, 5).map(mcqBankContent),
    ...OPEN_FALLBACK_ETHICAL.slice(0, 1).map(openItemContent),
  ];
}

// Generate the items for a new attempt of an assessment, tailored to the picked
// answer format. Falls back to static content if generation fails.
export async function generateVariantItems(
  instrument: "ethical" | "critical",
  templateItems: DiagnosticItemRow[],
  format?: string | null,
): Promise<GeneratedItemContent[]> {
  const fmt = normalizeFormat(instrument, format);
  try {
    if (instrument === "critical") {
      const skills = templateItems
        .filter((it) => it.type === "mcq")
        .map((it) => (it.scoring as McqScoring).skillArea);
      const examples = templateItems.slice(0, 3).map((it) => it.prompt);
      const baseSkills = skills.length > 0 ? skills : ALL_SKILLS;
      if (fmt === "mcq") {
        return await generateMcqItems(baseSkills, examples);
      }
      if (fmt === "hybrid") {
        const mcqSkills = baseSkills.slice(0, Math.max(1, baseSkills.length - 2));
        const openSkills = baseSkills.slice(mcqSkills.length);
        const mcq = await generateMcqItems(mcqSkills, examples);
        const open = await generateOpenItems(
          "critical",
          (openSkills.length > 0 ? openSkills : ALL_SKILLS.slice(0, 2)),
        );
        return [...mcq, ...open];
      }
      // written — a few short open questions, one per skill (max 5).
      const writtenSkills = baseSkills.slice(0, 5);
      return await generateOpenItems("critical", writtenSkills);
    }

    // ethical
    if (fmt === "written") {
      return await generateEthicalVariant(templateItems);
    }
    if (fmt === "mcq") {
      return await generateJudgmentMcqItems(6);
    }
    // hybrid — mostly judgment MCQ plus one short written answer.
    const mcq = await generateJudgmentMcqItems(5);
    const open = await generateOpenItems("ethical", [undefined]);
    return [...mcq, ...open];
  } catch (err) {
    logger.warn(
      {
        instrument,
        format: fmt,
        err: err instanceof Error ? err.message : String(err),
      },
      "Reasoning item generation failed, using static fallback",
    );
    return staticFallback(instrument, fmt, templateItems);
  }
}

// A per-question review row: the item, what the student answered, and the
// correct answer / expected idea. Built after submission so the student can
// see their work.
export interface ReviewItem {
  itemId: number;
  type: "mcq" | "dilemma" | "open";
  prompt: string;
  options: string[] | null;
  selectedIndex: number | null;
  correctIndex: number | null;
  isCorrect: boolean | null;
  decisionOptions: string[] | null;
  decisionIndex: number | null;
  considerations: string[] | null;
  ranking: number[] | null;
  text: string | null;
  expectedPoints: string[] | null;
  rationale: string | null;
}

export function buildReview(
  items: DiagnosticItemRow[],
  responses: ResponseInput[],
  judged?: Map<number, number>,
  openGrades?: Map<number, OpenGrade>,
): ReviewItem[] {
  const byItem = new Map(responses.map((r) => [r.itemId, r]));
  return items.map((item) => {
    const resp = byItem.get(item.id);
    if (item.type === "mcq") {
      const payload = item.payload as { options: string[] };
      const scoring = item.scoring as McqScoring;
      // The correct option is the model-judged one; fall back to stored key.
      const correctIndex = judged?.get(item.id) ?? scoring.correctIndex;
      const selectedIndex =
        typeof resp?.selectedIndex === "number" ? resp.selectedIndex : null;
      return {
        itemId: item.id,
        type: "mcq" as const,
        prompt: item.prompt,
        options: payload.options,
        selectedIndex,
        correctIndex,
        isCorrect:
          selectedIndex === null ? null : selectedIndex === correctIndex,
        decisionOptions: null,
        decisionIndex: null,
        considerations: null,
        ranking: null,
        text: null,
        expectedPoints: null,
        rationale: null,
      };
    }
    if (item.type === "open") {
      const scoring = item.scoring as OpenScoring;
      const grade = openGrades?.get(item.id);
      const text = typeof resp?.text === "string" ? resp.text : null;
      return {
        itemId: item.id,
        type: "open" as const,
        prompt: item.prompt,
        options: null,
        selectedIndex: null,
        correctIndex: null,
        isCorrect: grade ? grade.correct : null,
        decisionOptions: null,
        decisionIndex: null,
        considerations: null,
        ranking: null,
        text,
        expectedPoints: scoring.keyPoints ?? null,
        rationale: grade?.rationale ?? null,
      };
    }
    const payload = item.payload as DilemmaPayload;
    return {
      itemId: item.id,
      type: "dilemma" as const,
      prompt: item.prompt,
      options: null,
      selectedIndex: null,
      correctIndex: null,
      isCorrect: null,
      decisionOptions: payload.decisionOptions,
      decisionIndex:
        typeof resp?.decisionIndex === "number" ? resp.decisionIndex : null,
      considerations: payload.considerations,
      ranking: resp?.ranking ?? null,
      text: null,
      expectedPoints: null,
      rationale: null,
    };
  });
}

// Strip the hidden scoring key before sending an item to the client.
export function publicItem(item: DiagnosticItemRow) {
  const base = {
    id: item.id,
    position: item.position,
    type: item.type,
    prompt: item.prompt,
  };
  if (item.type === "mcq") {
    const payload = item.payload as { options: string[] };
    return { ...base, options: payload.options };
  }
  if (item.type === "open") {
    return { ...base };
  }
  const payload = item.payload as DilemmaPayload;
  return {
    ...base,
    decisionOptions: payload.decisionOptions,
    considerations: payload.considerations,
    rankCount: payload.rankCount,
  };
}
