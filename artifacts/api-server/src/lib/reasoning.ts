import { chatText } from "./ai";
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
): ScoreSummary {
  const byItem = new Map(responses.map((r) => [r.itemId, r]));
  let correct = 0;
  const total = items.length;
  const perSkill = new Map<SkillArea, { correct: number; total: number }>();

  for (const item of items) {
    const scoring = item.scoring as McqScoring;
    const skill = scoring.skillArea;
    const bucket = perSkill.get(skill) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    const resp = byItem.get(item.id);
    if (resp && resp.selectedIndex === scoring.correctIndex) {
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
  };
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
): ScoreSummary {
  return instrument === "ethical"
    ? scoreEthical(items, responses)
    : scoreCritical(items, responses);
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
