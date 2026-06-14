// ---------------------------------------------------------------------------
// Content types for the Constructive Critical Reasoning (CCR) curriculum.
//
// CCR is the discipline of drawing the STRONGEST affirmative conclusion a body
// of data supports. Grading is therefore INVERTED relative to a normal test:
//   - The richest, most-falsifiable, most-committed model earns TOP credit.
//   - The cautious "you can't really conclude that" dodge earns NEAR-ZERO.
//   - Empty, florid elaborateness that binds no data scores LOW.
//
// Each section's homework is authored in all three formats up front; the student
// picks ONE at start. Per-option credit weights live AS DATA in `mcOptions`.
// ---------------------------------------------------------------------------

export type McOption = {
  text: string;
  // Partial credit in [0, 1]. EXACTLY ONE option must be 0 — the "dodge": a
  // real fallacy or a non-committal refusal ("the data can't support any
  // conclusion"). The other three descend from the richest / most-falsifiable /
  // most-committed model (1.0) down a gradient (e.g. 1.0, 0.6, 0.3).
  credit: number;
};

export type WrittenRubric = {
  // For HYBRID items only: the short written follow-up prompt. Omit for pure
  // written items (whose prompt is the problem prompt itself).
  prompt?: string;
  // A top-credit exemplar answer (commits hard, binds the data, exposes a test).
  modelAnswer: string;
  // Observations / data points in the scenario the strongest model must BIND
  // and explain. Drives the YIELD axis (how much data the answer accounts for).
  yieldAnchors: string[];
  // The checkable, falsifiable predictions or tests a strong answer commits to.
  // Drives the RISK axis (does it expose itself to clean disconfirmation?).
  riskAnchors: string[];
  // Claims the supplied data ACTIVELY DEFEATS; asserting them costs credit.
  defeatedBy: string[];
};

export type HomeworkItem = {
  itemType: "mc" | "written" | "hybrid";
  prompt: string;
  // mc + hybrid: exactly FOUR options, exactly one with credit 0 (the dodge).
  mcOptions?: McOption[];
  // written + hybrid: the yield/risk rubric (hybrid also carries the written
  // follow-up prompt inside `prompt`).
  writtenRubric?: WrittenRubric;
  // Back-compat display value: the best-answer text (top MC option text, or the
  // written model answer). Stored in problems.correct_answer (NOT NULL).
  correctAnswer: string;
  // Shown after grading: why the top answer earns top credit under CCR's
  // inverted logic (commits hardest to the most, exposes the cleanest test).
  explanation: string;
  hint?: string;
};

export type SectionContent = {
  slug: string;
  title: string;
  weekNumber: number;
  blurb: string;
  lectureTitle: string;
  // Short-depth lecture body in Markdown. Medium/long are generated on demand.
  body: string;
  homework: {
    mcq: HomeworkItem[]; // 15 MC items (long format)
    hybrid: HomeworkItem[]; // 9 hybrid items (medium format)
    written: HomeworkItem[]; // 5 written items (short format)
  };
};
