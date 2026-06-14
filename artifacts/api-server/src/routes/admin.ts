import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, problemsTable } from "@workspace/db";
import {
  RunGraderLabResponse,
  UpdateCourseSettingsBody,
  UpdateCourseSettingsResponse,
} from "@workspace/api-zod";
import { gradeWrittenPart } from "../lib/homeworkGrading";
import type { WrittenRubric } from "../lib/homeworkContent/types";
import { updateCourseSettings } from "../lib/settings";
import { chatJson } from "../lib/ai";

const router: IRouter = Router();

interface GeneratedCase {
  label: string;
  kind: string;
  expectedCredit: number;
  answer: string;
}

// The grader lab audits the INVERTED CCR written grader: it generates a spread
// of candidate student answers that span the credit scale and shows what
// partial credit the live grader awards versus what a fair grader should.
const GENERATION_SYSTEM = [
  "You generate a test bench of candidate STUDENT answers so an administrator can audit an AI grader for a course on Constructive Critical Reasoning (CCR).",
  "In CCR the grader is INVERTED: the answer that commits to the RICHEST, most-falsifiable model the data supports earns top credit; a cautious 'we can't really conclude anything' dodge earns ZERO; florid-but-empty padding that binds no data earns LOW; and a bold claim the data actively DEFEATS earns zero.",
  "You are given a QUESTION and a MODEL ANSWER (a fallible exemplar). Produce a wide spread of candidate answers that probe the grader.",
  "",
  "`expectedCredit` is the partial credit in [0,1] a FAIR inverted grader SHOULD award — judging ONLY on substance (yield + commitment/falsifiability, minus data-defeated overreach), never on grammar, spelling, length, or style.",
  "",
  "Generate at least these kinds (use the `kind` value shown):",
  "- committed_rich: binds essentially all the data AND commits to a concrete falsifiable test/prediction. expectedCredit ~0.95",
  "- committed_partial: commits to a real model but binds less of the data or names a weaker test. expectedCredit ~0.6",
  "- minimal_but_committed: terse / fragmentary but names a concrete, checkable claim. expectedCredit ~0.5",
  "- cautious_dodge: refuses to commit — 'it depends', 'we can't know', pure hedge. expectedCredit 0",
  "- florid_empty: long, confident-sounding, elaborate, but binds no specific data and names no test. expectedCredit ~0.15",
  "- data_defeated: commits boldly to a claim the supplied data actively contradicts / overreaches. expectedCredit 0",
  "",
  "Give each case a short human-readable `label`. Keep answers realistic and concise (1-4 sentences/fragments).",
  'Output strict JSON: {"cases": [{"label": string, "kind": string, "expectedCredit": number, "answer": string}]}.',
].join("\n");

router.post("/admin/grader-lab", async (req, res): Promise<void> => {
  const body = (req.body ?? {}) as {
    problemId?: number | null;
    prompt?: string | null;
    correctAnswer?: string | null;
  };

  let prompt = (body.prompt ?? "").trim();
  let correctAnswer = (body.correctAnswer ?? "").trim();
  let rubric: WrittenRubric | null = null;

  if (body.problemId != null && Number.isFinite(body.problemId)) {
    const [p] = await db
      .select()
      .from(problemsTable)
      .where(eq(problemsTable.id, body.problemId));
    if (!p) {
      res.status(404).json({ error: "problem not found" });
      return;
    }
    prompt = p.prompt;
    correctAnswer = p.correctAnswer;
    rubric = (p.writtenRubric as WrittenRubric | null) ?? null;
  }

  if (!prompt || !correctAnswer) {
    res
      .status(400)
      .json({ error: "provide problemId, or both prompt and correctAnswer" });
    return;
  }

  // Build a rubric for grading. Fall back to using the model answer alone when
  // the audited item has no stored written rubric (e.g. an MC-only item).
  const gradingRubric: WrittenRubric = rubric ?? {
    modelAnswer: correctAnswer,
    yieldAnchors: [],
    riskAnchors: [],
    defeatedBy: [],
  };

  let generated: GeneratedCase[] = [];
  try {
    const out = await chatJson<{ cases: GeneratedCase[] }>(
      GENERATION_SYSTEM,
      JSON.stringify({ question: prompt, model_answer: correctAnswer }),
    );
    generated = Array.isArray(out.cases) ? out.cases : [];
  } catch {
    generated = [];
  }

  // Always include a genuinely blank answer as a zero-credit control.
  generated.push({
    label: "Blank / no answer",
    kind: "blank",
    expectedCredit: 0,
    answer: "",
  });

  // Grade every candidate on substance only — no AI detection runs here.
  const cases = await Promise.all(
    generated.map(async (g) => {
      const graded = await gradeWrittenPart({
        prompt,
        rubric: gradingRubric,
        userAnswer: g.answer ?? "",
      });
      const expectedCredit = Math.max(0, Math.min(1, Number(g.expectedCredit) || 0));
      return {
        label: g.label || g.kind || "case",
        kind: g.kind || "unknown",
        expectedCredit,
        answer: g.answer ?? "",
        credit: graded.credit,
        explanation: graded.explanation,
      };
    }),
  );

  res.json(RunGraderLabResponse.parse({ prompt, correctAnswer, cases }));
});

router.put("/admin/settings", async (req, res): Promise<void> => {
  const parsed = UpdateCourseSettingsBody.safeParse(req.body ?? {});
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const settings = await updateCourseSettings(parsed.data);
  res.json(UpdateCourseSettingsResponse.parse(settings));
});

export default router;
