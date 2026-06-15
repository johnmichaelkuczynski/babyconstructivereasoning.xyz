import { chatText, chatJson } from "./ai";
import { logger } from "./logger";
import type { SkillArea, OpenItem, Instrument } from "./diagnosticContent";
import { CCR_OPEN_BANK, CCR_SUBSKILLS } from "./ccrReasoningContent";

export type ReasoningFormat = "mcq" | "hybrid" | "written";

// Shape of a persisted diagnostic item row (payload/scoring are jsonb).
export interface DiagnosticItemRow {
  id: number;
  position: number;
  type: "mcq" | "open";
  prompt: string;
  payload: unknown;
  scoring: unknown;
}

// One student response (matches ReasoningResponseInput in the OpenAPI spec).
export interface ResponseInput {
  itemId: number;
  text?: string | null;
  selectedIndex?: number | null;
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
  instrument: Instrument;
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
  skillArea?: SkillArea;
}
interface OpenScoring {
  keyPoints: string[];
  skillArea?: SkillArea;
}

const SKILL_LABELS: Record<SkillArea, string> = {
  analysis: "Analysis",
  inference: "Inference",
  evaluation: "Evaluation",
  deduction: "Deduction",
  induction: "Induction",
};

// --- Objective (MCQ + open) scoring --------------------------------------
// Every format (mcq / hybrid / written) for both instruments uses the same
// correct-out-of-total scoring. Each MCQ and each open answer counts equally,
// with a per-skill breakdown when items carry a skill area (reasoning only).

function scoreObjective(
  instrument: Instrument,
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
    } else {
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
export async function judgeMcq(
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
        "You are an expert reasoner and AI educator. For each multiple-choice question, determine which single option is GENUINELY correct (the most defensible/best answer), reasoning from first principles.",
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
    logger.warn({ err }, "judgeMcq failed; falling back to stored keys");
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

export function scoreAssessment(
  instrument: Instrument,
  items: DiagnosticItemRow[],
  responses: ResponseInput[],
  judged?: Map<number, number>,
  openGrades?: Map<number, OpenGrade>,
): ScoreSummary {
  return scoreObjective(
    instrument,
    items,
    responses,
    judged ?? new Map(),
    openGrades ?? new Map(),
  );
}

// --- Written feedback (AI with deterministic fallback) --------------------

function deterministicFeedback(summary: ScoreSummary): string {
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
      ? ` Your strongest opportunity for growth is in ${weak.join(", ")}; revisit those ideas and how the evidence supports them.`
      : " Your answers were solid across the items.";
  return `Thank you for completing this assessment. ${overall?.value ? `You scored ${overall.value}.` : ""}${weakLine} This is practice only and never affects your grade — retake it any time to keep sharpening.`;
}

export async function generateFeedback(
  assessmentTitle: string,
  summary: ScoreSummary,
): Promise<string> {
  const metricsText = summary.metrics
    .map((m) => `- ${m.label}: ${m.value}${m.detail ? ` (${m.detail})` : ""}`)
    .join("\n");
  const system =
    "You are a warm, encouraging instructor giving specific feedback on a student's practice assessment. 2-4 sentences. Note overall performance and any areas to strengthen, using ONLY the metrics provided. Make clear this is practice that never affects their grade. Plain prose, no markdown headings.";
  const user = `Assessment: ${assessmentTitle}\nResult summary: ${summary.headline}\nMetrics:\n${metricsText}`;
  try {
    const text = await chatText(system, user);
    if (text && text.length > 20) return text;
  } catch {
    // fall through to deterministic feedback
  }
  return deterministicFeedback(summary);
}

// --- Per-attempt item generation ----------------------------------------
// Every attempt (first take or retake) generates a fresh set of items tailored
// to the picked answer format. If the model is unavailable or returns an
// unusable shape, we fall back to static content so an attempt never blocks.

// Content of an item ready to be inserted (no id / attemptId / position yet).
export interface GeneratedItemContent {
  type: "mcq" | "open";
  prompt: string;
  payload: unknown;
  scoring: unknown;
}

export function normalizeFormat(format?: string | null): ReasoningFormat {
  if (format === "mcq" || format === "hybrid" || format === "written") {
    return format;
  }
  return "mcq";
}

export type ReasoningLength = "short" | "medium" | "long";

export function normalizeLength(length?: string | null): ReasoningLength {
  if (length === "short" || length === "medium" || length === "long") {
    return length;
  }
  return "medium";
}

// How many of each item kind to produce for a given (format, length). Uniform
// across both instruments.
interface ItemComposition {
  mcq: number;
  open: number;
}

export function itemComposition(
  format: ReasoningFormat,
  length: ReasoningLength,
): ItemComposition {
  const pick = (short: number, medium: number, long: number): number =>
    length === "short" ? short : length === "long" ? long : medium;
  if (format === "mcq") return { mcq: pick(5, 10, 16), open: 0 };
  if (format === "hybrid") return { mcq: pick(4, 8, 12), open: pick(1, 2, 3) };
  return { mcq: 0, open: pick(3, 5, 8) }; // written
}

// Repeat the entries of `arr` cyclically until there are exactly `n` of them.
function cycleTo<T>(arr: T[], n: number): T[] {
  if (arr.length === 0 || n <= 0) return [];
  const out: T[] = [];
  for (let i = 0; i < n; i++) out.push(arr[i % arr.length]!);
  return out;
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

// CCR generation standard, shared by the MCQ and open generators so every
// freshly generated diagnostic item enforces the inverted rubric.
const CCR_STANDARD =
  "Constructive Critical Reasoning (CCR) means drawing the STRONGEST conclusion the AVAILABLE EVIDENCE actually warrants. " +
  "CRITICAL — every scenario you write MUST contain concrete, discriminating evidence that genuinely points to one conclusion over the rivals. " +
  "NEVER write a scenario where the rival explanations fit the facts equally well and nothing in the scenario separates them: in that case the honest answer really IS 'there isn't enough data to decide yet,' so marking that answer wrong would be an unfair trick question. Simplicity/parsimony alone is NOT proof — it can only suggest which cheap test to run, never settle the matter by itself. " +
  "The genuinely-best answer commits to the conclusion the given evidence supports and/or names a cheap decisive test that would confirm it. " +
  "Wrong options should be: a reckless overreach the evidence does NOT support, and a passive/give-up move (e.g. 'the cause is unknowable, change nothing'). Include a 'you can't conclude anything' refusal as a distractor ONLY when the scenario truly contains enough discriminating evidence to decide — there it is wrong precisely because the data DOES point somewhere. " +
  "Never punish a reasoner for declining to guess when no evidence favors either side.";

// Generate fresh CCR scenario MCQs, one per given sub-skill (in order).
async function generateCcrMcq(
  subskills: string[],
  examplePrompts: string[],
): Promise<GeneratedItemContent[]> {
  if (subskills.length === 0) return [];
  const system =
    "You are an assessment author writing ORIGINAL reasoning multiple-choice questions. " +
    CCR_STANDARD +
    " Each question must present a short, concrete everyday SCENARIO that INCLUDES specific discriminating evidence, then ask — in plain language a thoughtful person can answer WITHOUT having taken any course — which response reasons best about it. Never name a 'standard' or doctrine in the prompt, and never ask for a definition or recitation. " +
    "Each has exactly four options with one unambiguously best answer. List the CORRECT (best-supported, most-testable) option FIRST. Make the three distractors a reckless overreach the evidence doesn't support, a passive/give-up move, and (only if the scenario genuinely has enough evidence to decide) a 'can't conclude anything' refusal; if it does not, use another flawed-reasoning distractor instead. " +
    "Write fresh questions on varied everyday topics — do NOT reuse the example wording. " +
    'Respond ONLY as JSON of the form {"items":[{"prompt":"...","options":["correct","wrong","wrong","wrong"]}]}.';
  const user =
    `Write ${subskills.length} new questions, one per CCR sub-skill in THIS exact order: ${JSON.stringify(subskills)}.\n` +
    `Each question should reward the answer that best demonstrates that sub-skill.\n` +
    `For style only (do NOT copy these): ${JSON.stringify(examplePrompts)}.`;
  const out = await chatJson<{
    items?: { prompt?: unknown; options?: unknown }[];
  }>(system, user);
  const raw = out.items;
  if (!Array.isArray(raw) || raw.length !== subskills.length) {
    throw new Error("ccr mcq: wrong item count");
  }
  return raw.map((q) => {
    const prompt = q.prompt;
    const options = q.options;
    if (typeof prompt !== "string" || prompt.trim().length < 8) {
      throw new Error("ccr mcq: bad prompt");
    }
    if (
      !Array.isArray(options) ||
      options.length !== 4 ||
      !options.every((o) => typeof o === "string" && o.trim().length > 0)
    ) {
      throw new Error("ccr mcq: bad options");
    }
    const { options: rotated, correctIndex } = rotateOptions(options as string[]);
    return {
      type: "mcq" as const,
      prompt: prompt.trim(),
      payload: { options: rotated },
      scoring: { correctIndex } satisfies McqScoring,
    };
  });
}

// Generate fresh short CCR open-response questions (1-2 sentence answers), one
// per given sub-skill (in order). A good answer commits to the strongest
// supported conclusion AND names a test — never hedges.
async function generateOpenItems(
  subskills: string[],
): Promise<GeneratedItemContent[]> {
  const count = subskills.length;
  if (count === 0) return [];
  const system =
    "You are an assessment author writing ORIGINAL very short open-response questions that can be answered in ONE or TWO sentences. " +
    CCR_STANDARD +
    " Each presents a brief everyday situation that INCLUDES specific discriminating evidence, and asks the student to state the strongest conclusion that evidence supports AND a test (or falsifying prediction). Only build situations where the evidence genuinely points somewhere — never one where the honest answer is 'there's no data to decide.' Phrase it plainly, with no doctrine name. " +
    "Each prompt MUST be a single, self-contained question with NO multi-part scaffolding: never ask for a specific number of examples, never split into sub-parts like 'A, B, and C', and never tack on extra constraints. Keep it short, plain, and low-effort so a busy student answers it in a sentence or two. " +
    "For each question also provide keyPoints: the 1-3 core ideas a correct brief answer should capture (the committed conclusion and the test). " +
    'Respond ONLY as JSON {"items":[{"prompt":"...","keyPoints":["..."]}]}.';
  const user = `Write ${count} new, distinct questions, one per CCR sub-skill in THIS exact order: ${JSON.stringify(subskills)}.`;
  const out = await chatJson<{
    items?: { prompt?: unknown; keyPoints?: unknown }[];
  }>(system, user);
  const raw = out.items;
  if (!Array.isArray(raw) || raw.length !== count) {
    throw new Error("open items: wrong item count");
  }
  return raw.map((q) => {
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
      } satisfies OpenScoring,
    };
  });
}

// Static fallback composition per format so an attempt is never blocked when AI
// generation is unavailable.
function staticFallback(
  format: ReasoningFormat,
  length: ReasoningLength,
  template: DiagnosticItemRow[],
): GeneratedItemContent[] {
  const comp = itemComposition(format, length);
  const tmplMcq = templateContent(template.filter((it) => it.type === "mcq"));
  const openBank = CCR_OPEN_BANK.map(openItemContent);
  if (format === "mcq") return cycleTo(tmplMcq, comp.mcq);
  if (format === "hybrid") {
    return [...cycleTo(tmplMcq, comp.mcq), ...cycleTo(openBank, comp.open)];
  }
  return cycleTo(openBank, comp.open); // written
}

// Generate the items for a new attempt of an assessment, tailored to the picked
// answer format. Falls back to static content if generation fails.
export async function generateVariantItems(
  instrument: Instrument,
  templateItems: DiagnosticItemRow[],
  format?: string | null,
  length?: string | null,
): Promise<GeneratedItemContent[]> {
  const fmt = normalizeFormat(format);
  const len = normalizeLength(length);
  const comp = itemComposition(fmt, len);
  try {
    const examples = templateItems.slice(0, 3).map((it) => it.prompt);
    if (fmt === "mcq") {
      return await generateCcrMcq(cycleTo(CCR_SUBSKILLS, comp.mcq), examples);
    }
    if (fmt === "hybrid") {
      const mcq = await generateCcrMcq(cycleTo(CCR_SUBSKILLS, comp.mcq), examples);
      const open = await generateOpenItems(cycleTo(CCR_SUBSKILLS, comp.open));
      return [...mcq, ...open];
    }
    return await generateOpenItems(cycleTo(CCR_SUBSKILLS, comp.open));
  } catch (err) {
    logger.warn(
      {
        instrument,
        format: fmt,
        length: len,
        err: err instanceof Error ? err.message : String(err),
      },
      "Reasoning item generation failed, using static fallback",
    );
    return staticFallback(fmt, len, templateItems);
  }
}

// A per-question review row: the item, what the student answered, and the
// correct answer / expected idea. Built after submission so the student can
// see their work.
export interface ReviewItem {
  itemId: number;
  type: "mcq" | "open";
  prompt: string;
  options: string[] | null;
  selectedIndex: number | null;
  correctIndex: number | null;
  isCorrect: boolean | null;
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
        text: null,
        expectedPoints: null,
        rationale: null,
      };
    }
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
      text,
      expectedPoints: scoring.keyPoints ?? null,
      rationale: grade?.rationale ?? null,
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
  return { ...base };
}
