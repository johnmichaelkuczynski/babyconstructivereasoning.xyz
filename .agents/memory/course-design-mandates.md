---
name: Course design mandates (Data Detective)
description: Non-obvious user mandates about the AI course UX that look removable but are intentional and must be preserved.
---

# Course design mandates

These are explicit user requirements that a future agent might wrongly "clean up"
because they seem unwarranted for a plain-language, no-math course. They are intentional.

## Math keyboard is mandatory everywhere
A symbol palette (`MathKeyboard`) must be present on EVERY freeform input — answer
inputs (practice, practice-assignments, real assignments) AND the AI tutor chat
boxes — even though the course subject is non-technical and "doesn't seem to warrant it."

**Why:** Direct user mandate ("MAKE SURE THE MATH KEYBOARD IS PRESENT, INCLUDING WITH
AI TUTOR, EVEN IF THE SUBJECT-MATTER DOES NOT SEEM TO WARRANT IT").
**How to apply:** Do not remove the keyboard from any input. Math-keyboard insertions
must count as `keystrokeCount` (not bulk-insert) in the keystroke
trace, or legitimate symbol use false-flags the AI-authorship detector.

## Questions must require operational reasoning, never recitation
ALL questions — homeworks, unit test, final, practice assignments, AND the adaptive
topic drill — must pose a specific concrete scenario and require a multi-sentence
reasoned answer. Never a one-word/single-term/"yes-no" answer, never "define X" or
"recite the abstract formulation from the text."

**Why:** Repeated, emphatic user mandate — answers must be "hard to share" and prove
operational understanding, not memorization. The adaptive drill previously generated
single-word concept-ID questions and was the one place that violated this.
**How to apply:** Any new question-generation prompt must forbid definitions/one-word
answers and demand a concrete case + reasoned answer. The semantic `gradeAnswer` grader
already handles reasoned answers, so longer answers are safe to grade.

## Diagnostic scenarios must carry real discriminating evidence — never punish honest uncertainty
The CCR/reasoning diagnostic must NOT plant "you can't conclude anything" as an
automatically-wrong option. Every generated/static scenario must contain concrete
discriminating evidence so a conclusion is genuinely warranted; the "can't conclude"
refusal is a wrong distractor ONLY when the data truly decides. Equal-fit / no-data
scenarios where the only basis to choose is parsimony/aesthetics are FORBIDDEN — there,
declining to guess (and naming the test that would settle it) is the honest answer.
Prompts must be answerable by plain reasoning: never reference "the CCR standard" or any
named doctrine (the pre-course baseline student hasn't learned it).

**Why:** Emphatic user mandate — such items are "trick questions." Parsimony/Ockham is
not proof; with no data a sane person says "it might or might not be — I have no data."
**How to apply:** Lives in `reasoning.ts` (CCR_STANDARD + generateCcrMcq/generateOpenItems
prompts) and the static bank `ccrReasoningContent.ts`. The good answer in a thin-data
case is "name the cheap decisive test," and the worst distractor is passive give-up
("unknowable, change nothing"), NOT honest uncertainty.

## Typed (open) answers are graded leniently on substance, NEVER on length
The diagnostic instruments offer three pickable formats (mcq / hybrid / written).
For any typed/open answer, grading must credit a single correct core idea even if
stated very briefly. Length, grammar, spelling, and coverage are never penalized.

**Why:** Direct constraint — keep typing minimal and grade short answers on substance.
A deterministic `words >= N` fallback inside `gradeOpen` violated this (short-but-correct
answers were failed when the LLM grader was unavailable).
**How to apply:** The LLM grader prompt must say "never penalize length"; the
no-model fallback must credit any on-topic non-blank answer (test for content, e.g.
contains an alphanumeric char) — never a word/character count threshold.
