// ---------------------------------------------------------------------------
// Original content for the embedded diagnostic reasoning assessments.
//
// A single subject-relevant instrument — "ccr" (Constructive Critical
// Reasoning) — administered at four phases (before the course, one-third
// through, two-thirds through, and after) with freshly generated items per
// attempt. CCR measures whether a student draws the STRONGEST conclusion the
// AVAILABLE EVIDENCE actually warrants: the best answer commits to the
// evidence-supported model and/or names a cheap decisive test. The failure
// modes are reckless overreach and passive give-up. Every scenario must carry
// real discriminating evidence — when evidence is genuinely insufficient,
// declining to guess (and naming the test that would settle it) is honest, not
// a dodge, so no-data/equal-fit scenarios are never used.
//
// Every item is MCQ or short open-response. All items are ORIGINAL and
// scenario-based. For every MCQ the genuinely-best option is written FIRST; at
// seed/generation time options are rotated so the correct answer lands at a
// varied index (see seedDiagnostics.ts / reasoning.ts).
//
// Diagnostics are PRACTICE ONLY — they never affect a student's grade, can be
// retaken any number of times, and never repeat the same questions. The course
// settings define a minimum number of diagnostics a student should complete.
// ---------------------------------------------------------------------------

import { CCR_MCQ_BANK } from "./ccrReasoningContent";

export type SkillArea =
  | "analysis"
  | "inference"
  | "evaluation"
  | "deduction"
  | "induction";

export type McqItem = {
  prompt: string;
  // Correct option is listed FIRST. Rotated at seed/generation time.
  options: string[];
  skillArea?: SkillArea;
};

export type OpenItem = {
  prompt: string;
  // The core idea(s) a good 1-2 sentence answer should capture. Used both as
  // the lenient grading key and shown to the student in review.
  keyPoints: string[];
  skillArea?: SkillArea;
};

export type Phase = "before" | "third1" | "third2" | "after";

// A single CCR instrument now backs every diagnostic.
export type Instrument = "ccr";

export type DiagnosticSeed = {
  instrument: Instrument;
  phase: Phase;
  title: string;
  subtitle: string;
  instructions: string;
  // Seeded template items (the structural blueprint + static fallback). Every
  // attempt generates fresh items of the same kind; the template is only used
  // for the assessment preview and as the generation/fallback blueprint.
  mcqs: McqItem[];
};

const CCR_INSTRUCTIONS =
  "Answer each question by choosing the best option (or, for written questions, typing a short 1-2 sentence answer). These questions measure constructive critical reasoning — drawing the strongest, most-testable conclusion the evidence actually supports, and, when the evidence is genuinely insufficient, naming the test that would settle it. This is practice only: it never affects your grade, and you can retake it any time with fresh questions.";

// ===========================================================================
// SEED — one CCR instrument × four phases (4 assessments)
// ===========================================================================

const PHASES: { phase: Phase; label: string }[] = [
  { phase: "before", label: "Before the course" },
  { phase: "third1", label: "One-third through" },
  { phase: "third2", label: "Two-thirds through" },
  { phase: "after", label: "After the course" },
];

export const DIAGNOSTIC_SEED: DiagnosticSeed[] = PHASES.map((p) => ({
  instrument: "ccr" as const,
  phase: p.phase,
  title: `Constructive Critical Reasoning Check — ${p.label}`,
  subtitle: p.label,
  instructions: CCR_INSTRUCTIONS,
  mcqs: CCR_MCQ_BANK,
}));
