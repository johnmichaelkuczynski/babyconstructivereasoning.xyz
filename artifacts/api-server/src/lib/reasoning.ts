import { chatText, chatJson } from "./ai";
import { logger } from "./logger";
import type { Stage, SkillArea } from "./diagnosticContent";

// Shape of a persisted diagnostic item row (payload/scoring are jsonb).
export interface DiagnosticItemRow {
  id: number;
  position: number;
  type: "dilemma" | "mcq";
  prompt: string;
  payload: unknown;
  scoring: unknown;
}

// One student response (matches ReasoningResponseInput in the OpenAPI spec).
export interface ResponseInput {
  itemId: number;
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

export interface ScoreSummary {
  instrument: "ethical" | "critical";
  headline: string;
  metrics: ReasoningMetric[];
  // For critical (MCQ) assessments: the model-judged correct option index per
  // item id, determined independently rather than from the stored answer key.
  // Persisted so a later review shows the same judged answers.
  correctByItem?: Record<number, number>;
}

interface McqScoring {
  correctIndex: number;
  skillArea: SkillArea;
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

// --- Critical reasoning (CCTST-style) scoring -----------------------------

function scoreCritical(
  items: DiagnosticItemRow[],
  responses: ResponseInput[],
  judged: Map<number, number>,
): ScoreSummary {
  const byItem = new Map(responses.map((r) => [r.itemId, r]));
  let correct = 0;
  const total = items.length;
  const perSkill = new Map<SkillArea, { correct: number; total: number }>();
  const correctByItem: Record<number, number> = {};

  for (const item of items) {
    const scoring = item.scoring as McqScoring;
    const skill = scoring.skillArea;
    const bucket = perSkill.get(skill) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    // Use the model-judged correct option; fall back to the stored key.
    const correctIndex = judged.get(item.id) ?? scoring.correctIndex;
    correctByItem[item.id] = correctIndex;
    const resp = byItem.get(item.id);
    if (resp && resp.selectedIndex === correctIndex) {
      correct += 1;
      bucket.correct += 1;
    }
    perSkill.set(skill, bucket);
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
    instrument: "critical",
    headline: `You answered ${correct} of ${total} correctly (${percent}%).`,
    metrics,
    correctByItem,
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
        "You are an expert in critical reasoning, logic, and argument analysis. For each multiple-choice question, determine which single option is GENUINELY correct, reasoning from first principles.",
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

// --- Ethical reasoning (DIT-style) scoring --------------------------------
// Principled-reasoning ("P") index: weight the ranked postconventional
// considerations. Top rank gets the most weight; P-index is the share of the
// maximum possible postconventional weight, scaled 0–100.

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
      label: "Principled-reasoning (P) index",
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
        ? `Your principled-reasoning index is ${pIndex}/100 — you weighted principle-based considerations heavily.`
        : `Your principled-reasoning index is ${pIndex}/100.`,
    metrics,
  };
}

export function scoreAssessment(
  instrument: "ethical" | "critical",
  items: DiagnosticItemRow[],
  responses: ResponseInput[],
  judged?: Map<number, number>,
): ScoreSummary {
  return instrument === "ethical"
    ? scoreEthical(items, responses)
    : scoreCritical(items, responses, judged ?? new Map());
}

// --- Written feedback (AI with deterministic fallback) --------------------

function deterministicFeedback(
  instrument: "ethical" | "critical",
  summary: ScoreSummary,
): string {
  if (instrument === "critical") {
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
        : " Your reasoning was solid across the analysis, inference, evaluation, deduction, and induction items.";
    return `Thank you for completing this critical-reasoning checkpoint. ${overall?.value ? `You scored ${overall.value}.` : ""}${weakLine} Remember that a strong answer follows only from the reasons given — distinguish what is stated, what is assumed, and what is merely plausible.`;
  }
  const p = summary.metrics.find((m) => m.label.startsWith("Principled"));
  return `Thank you for working through this moral dilemma. ${p ? `Your principled-reasoning index was ${p.value}.` : ""} A high index means you gave the most weight to considerations about rights, fairness, and the impartial good rather than to self-interest or mere convention. There is no single correct answer here — what matters is whether your decision rests on reasons you could defend to anyone affected by it.`;
}

export async function generateFeedback(
  instrument: "ethical" | "critical",
  assessmentTitle: string,
  summary: ScoreSummary,
): Promise<string> {
  const metricsText = summary.metrics
    .map((m) => `- ${m.label}: ${m.value}${m.detail ? ` (${m.detail})` : ""}`)
    .join("\n");
  const system =
    instrument === "ethical"
      ? "You are an ethics instructor giving warm, specific feedback on a student's moral-reasoning self-assessment. 2-4 sentences. Explain what their principled-reasoning index reflects and offer one concrete way to deepen their reasoning. Do not invent numbers; use only the metrics provided. Plain prose, no markdown headings."
      : "You are a critical-thinking instructor giving warm, specific feedback on a student's reasoning assessment. 2-4 sentences. Note overall performance and the skill areas to strengthen, using only the metrics provided. Plain prose, no markdown headings.";
  const user = `Assessment: ${assessmentTitle}\nResult summary: ${summary.headline}\nMetrics:\n${metricsText}`;
  try {
    const text = await chatText(system, user);
    if (text && text.length > 20) return text;
  } catch {
    // fall through to deterministic feedback
  }
  return deterministicFeedback(instrument, summary);
}

// --- Retake variant generation ------------------------------------------
// On a retake we generate a fresh set of items of the SAME KIND as the seeded
// template: same instrument, same item count, the same skill areas (critical)
// or the same distribution of consideration stages (ethical), and the same
// answer/ranking structure — but different scenarios and questions. If the
// model is unavailable or returns an unusable shape, we fall back to the
// template items so a retake never blocks.

// Content of an item ready to be inserted (no id / attemptId / position yet).
export interface GeneratedItemContent {
  type: "dilemma" | "mcq";
  prompt: string;
  payload: unknown;
  scoring: unknown;
}

const STAGE_SET: Stage[] = ["P", "M", "PC", "X"];

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

// Return the template items as insertable content (used as the fallback when
// generation fails, and as the structural blueprint for generation).
function templateContent(items: DiagnosticItemRow[]): GeneratedItemContent[] {
  return items.map((it) => ({
    type: it.type,
    prompt: it.prompt,
    payload: it.payload,
    scoring: it.scoring,
  }));
}

async function generateCriticalVariant(
  items: DiagnosticItemRow[],
): Promise<GeneratedItemContent[]> {
  // Preserve the exact sequence of skill areas from the template.
  const skills = items.map((it) => (it.scoring as McqScoring).skillArea);
  const examplePrompts = items.slice(0, 3).map((it) => it.prompt);
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
    throw new Error("critical variant: wrong item count");
  }
  return raw.map((q, i) => {
    const expectedSkill = skills[i]!;
    const prompt = q.prompt;
    const options = q.options;
    if (typeof prompt !== "string" || prompt.trim().length < 8) {
      throw new Error("critical variant: bad prompt");
    }
    if (
      !Array.isArray(options) ||
      options.length !== 4 ||
      !options.every((o) => typeof o === "string" && o.trim().length > 0)
    ) {
      throw new Error("critical variant: bad options");
    }
    // Always pin the skill to the template position so the retake preserves
    // the exact skill-area order — never trust the model to keep it.
    const { options: rotated, correctIndex } = rotateOptions(options as string[]);
    return {
      type: "mcq" as const,
      prompt: prompt.trim(),
      payload: { options: rotated },
      scoring: { correctIndex, skillArea: expectedSkill },
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
    "You are an ethics-assessment author writing an ORIGINAL moral dilemma in the DIT tradition. " +
    "Produce a realistic, self-contained scenario about a named protagonist facing a hard moral choice, then a set of considerations someone might weigh. " +
    "Each consideration is tagged with a hidden stage you must honor:\n" +
    "- P = appeals to the protagonist's personal interest, image, or feelings\n" +
    "- M = appeals to law, rules, custom, authority, or social approval (maintaining norms)\n" +
    "- PC = appeals to impartial principles: rights, fairness, equal worth, the greater good (postconventional)\n" +
    "- X = a nonsensical or irrelevant statement that sounds sophisticated but says nothing (a reliability check)\n" +
    "Write a DISTINCT scenario from any example. " +
    'Respond ONLY as JSON: {"prompt":"scenario text ending with the yes/no moral question","decisionOptions":["do X","Can\'t decide","do opposite"],"considerations":[{"text":"...","stage":"PC"}]}.';
  const user =
    `Write ONE new dilemma with exactly ${decisionCount} decision options (the middle one should be "Can't decide") ` +
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

// Generate a fresh variant of an assessment's items for a retake. Falls back to
// the template items (so the attempt is never blocked) if generation fails.
export async function generateVariantItems(
  instrument: "ethical" | "critical",
  templateItems: DiagnosticItemRow[],
): Promise<GeneratedItemContent[]> {
  if (templateItems.length === 0) return [];
  try {
    const generated =
      instrument === "critical"
        ? await generateCriticalVariant(templateItems)
        : await generateEthicalVariant(templateItems);
    if (generated.length === templateItems.length) return generated;
    logger.warn(
      { instrument, want: templateItems.length, got: generated.length },
      "Reasoning variant: count mismatch, using template",
    );
  } catch (err) {
    logger.warn(
      { instrument, err: err instanceof Error ? err.message : String(err) },
      "Reasoning variant generation failed, using template items",
    );
  }
  return templateContent(templateItems);
}

// A per-question review row: the item, what the student answered, and the
// correct answer. Built after submission so the student can see their work.
export interface ReviewItem {
  itemId: number;
  type: "mcq" | "dilemma";
  prompt: string;
  options: string[] | null;
  selectedIndex: number | null;
  correctIndex: number | null;
  isCorrect: boolean | null;
  decisionOptions: string[] | null;
  decisionIndex: number | null;
  considerations: string[] | null;
  ranking: number[] | null;
}

export function buildReview(
  items: DiagnosticItemRow[],
  responses: ResponseInput[],
  judged?: Map<number, number>,
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
  const payload = item.payload as DilemmaPayload;
  return {
    ...base,
    decisionOptions: payload.decisionOptions,
    considerations: payload.considerations,
    rankCount: payload.rankCount,
  };
}
