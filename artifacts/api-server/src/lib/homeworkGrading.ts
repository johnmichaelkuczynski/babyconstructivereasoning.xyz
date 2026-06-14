// Inverted partial-credit grading for Constructive Critical Reasoning homework.
//
// CCR rewards committing to the richest, most-falsifiable model the data
// supports. Grading is therefore INVERTED relative to a normal test:
//   - MC items: credit is read straight from the item's stored per-option
//     weights (data, never hardcoded here). The zero-credit option is the
//     "dodge" (a fallacy or a non-committal refusal).
//   - Written items: an LLM rubric scores two summed axes — YIELD (how much of
//     the supplied data the proposed model binds) and RISK (whether it commits
//     to a checkable, falsifiable prediction/test) — minus a penalty for claims
//     the data actively defeats. Cautious "can't conclude" and florid-but-empty
//     answers both land near zero.
//   - Hybrid items: the average of the MC-part credit and the written-part
//     credit.
import { chatJson } from "./ai";
import type { McOption, WrittenRubric } from "./homeworkContent/types";

function clamp01(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

export interface WrittenAxes {
  yield: number;
  risk: number;
  defeated: number;
}

// Grade an MC part by reading the stored option credit weights.
export function gradeMcPart(
  options: McOption[],
  selectedIndex: number | null | undefined,
): { credit: number; explanation: string } {
  if (
    selectedIndex == null ||
    selectedIndex < 0 ||
    selectedIndex >= options.length
  ) {
    return { credit: 0, explanation: "No option was selected (zero credit)." };
  }
  const opt = options[selectedIndex]!;
  const credit = clamp01(opt.credit);
  const best = options.reduce((m, o) => Math.max(m, clamp01(o.credit)), 0);
  let explanation: string;
  if (credit === 0) {
    explanation =
      "Zero credit: this is the dodge — it refuses to commit, or asserts a claim the data defeats.";
  } else if (best > 0 && credit >= best) {
    explanation =
      "Full credit: this commits to the richest, most-falsifiable model the data supports.";
  } else {
    explanation = `Partial credit (${Math.round(
      credit * 100,
    )}%): a real commitment, but it binds less of the data or exposes a weaker test than the strongest option.`;
  }
  return { credit, explanation };
}

const WRITTEN_SYSTEM = [
  "You grade short written answers for a course on Constructive Critical Reasoning (CCR).",
  "CCR rewards drawing the STRONGEST affirmative conclusion the data supports. Grading is INVERTED: the richest, most-falsifiable, most-committed model earns top marks; a cautious 'you can't really conclude anything' dodge earns near-zero; florid but empty elaborateness that binds no data earns low.",
  "",
  "Score THREE axes, each a number from 0 to 1:",
  "- yield: how much of the supplied data/observations the student's proposed model actually BINDS and explains (0 = explains none / stays vague; 1 = binds essentially all the listed observations).",
  "- risk: does the answer COMMIT to a concrete, checkable, falsifiable prediction or decisive test? (0 = no commitment, pure hedge, 'it depends', 'we can't know'; 1 = names a clear test/prediction that could prove it wrong).",
  "- defeated: to what extent does the answer assert claims the supplied data ACTIVELY DEFEATS or overreaches beyond the data? (0 = none; 1 = its central claim is contradicted by the data).",
  "",
  "You are given yield_anchors (data a strong answer must bind), risk_anchors (tests a strong answer commits to), defeated_claims (overreaches to penalize), and a model_answer (a fallible exemplar, NOT ground truth — judge on substance).",
  "Never penalize grammar, spelling, length, or style. Reward commitment and testability; punish timidity and empty padding.",
  "Give a neutral 1-2 sentence rationale.",
  'Output strict JSON {"yield":number,"risk":number,"defeated":number,"rationale":string}.',
].join("\n");

// Grade a written part on the yield/risk rubric. Falls back to a provisional
// partial credit if the model is unavailable, so a submission never blocks.
export async function gradeWrittenPart(opts: {
  prompt: string;
  rubric: WrittenRubric;
  userAnswer: string;
}): Promise<{ credit: number; explanation: string; axes: WrittenAxes }> {
  const user = (opts.userAnswer ?? "").trim();
  if (!user) {
    return {
      credit: 0,
      explanation: "No answer was provided (zero credit).",
      axes: { yield: 0, risk: 0, defeated: 0 },
    };
  }
  try {
    const out = await chatJson<{
      yield: number;
      risk: number;
      defeated: number;
      rationale: string;
    }>(
      WRITTEN_SYSTEM,
      JSON.stringify({
        question: opts.rubric.prompt ?? opts.prompt,
        yield_anchors: opts.rubric.yieldAnchors ?? [],
        risk_anchors: opts.rubric.riskAnchors ?? [],
        defeated_claims: opts.rubric.defeatedBy ?? [],
        model_answer: opts.rubric.modelAnswer ?? "",
        student_answer: user,
      }),
    );
    const y = clamp01(out.yield);
    const r = clamp01(out.risk);
    const d = clamp01(out.defeated);
    const credit = clamp01(0.5 * y + 0.5 * r - 0.6 * d);
    const rationale =
      typeof out.rationale === "string" && out.rationale.trim()
        ? out.rationale.trim()
        : `Yield ${Math.round(y * 100)}%, commitment/risk ${Math.round(
            r * 100,
          )}%.`;
    return { credit, explanation: rationale, axes: { yield: y, risk: r, defeated: d } };
  } catch {
    const hasContent = /[a-zA-Z]/.test(user);
    return {
      credit: hasContent ? 0.4 : 0,
      explanation:
        "The grader was unavailable, so this received provisional partial credit. Compare your answer against the model answer.",
      axes: { yield: hasContent ? 0.4 : 0, risk: 0, defeated: 0 },
    };
  }
}
