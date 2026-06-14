---
name: Diagnostic instrument — single CCR instrument across 4 phases
description: The diagnostics subsystem now has ONE instrument (ccr) measured at four time-series phases, not multiple instrument kinds.
---

The diagnostics subsystem has exactly ONE instrument kind: `"ccr"`, whose
user-facing label is **"Constructive Critical Reasoning"**. It is measured at
FOUR phases (e.g. before / mid-1 / mid-2 / after) so growth can be compared over
time. The phase, not the instrument, is what varies per attempt.

**Why:** the product is now Constructive Critical Reasoning (CCR), not the old
AI-literacy course. The earlier multi-instrument model (`subject` → "AI
Knowledge", `reasoning` → "General Reasoning") is GONE, along with the even older
`ethical` / Professional-Judgment and `critical` kinds. Do not reintroduce any of
them.

**How to apply:**
- Never render a raw enum value; map `ccr` → "Constructive Critical Reasoning" at
  every render point (Reasoning page, ReasoningCallout, Grades row) and in
  server-side seed titles / scoring headlines / feedback prompts.
- Diagnostics are structured as 4 sets/phases with a 3×3 item menu, fresh items
  generated per attempt, longitudinal persistence keyed to phase, and a
  configurable min-to-pass driving pass/fail.
- Grading across the whole app is INVERTED (richest/most-falsifiable/most-
  committed = top credit; cautious "can't conclude" dodge = near-zero).
