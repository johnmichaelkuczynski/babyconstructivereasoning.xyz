import { Router, type IRouter } from "express";
import { and, asc, eq, sql } from "drizzle-orm";
import {
  db,
  assignmentsTable,
  problemsTable,
  attemptsTable,
  answersTable,
  topicsTable,
} from "@workspace/db";
import {
  GetAssignmentResponse,
  ListAssignmentsResponse,
  ListAssignmentProblemsResponse,
  SaveAnswerBody,
  StartAssignmentAttemptBody,
  StartAssignmentAttemptResponse,
  GetAttemptResponse,
  SubmitAttemptResponse,
} from "@workspace/api-zod";
import { gradeMcPart, gradeWrittenPart } from "../lib/homeworkGrading";
import { detect } from "../lib/detection";
import type { McOption, WrittenRubric } from "../lib/homeworkContent/types";

const router: IRouter = Router();

type Format = "mcq" | "hybrid" | "written";
const FORMATS: Format[] = ["mcq", "hybrid", "written"];
const FORMAT_LABELS: Record<Format, string> = {
  mcq: "Multiple choice",
  hybrid: "Hybrid (multiple choice + short written)",
  written: "Written",
};

function parseIdParam(raw: unknown): number {
  const s = Array.isArray(raw) ? raw[0] : (raw as string);
  return parseInt(s ?? "", 10);
}

function isFormat(v: unknown): v is Format {
  return v === "mcq" || v === "hybrid" || v === "written";
}

type ProblemRow = typeof problemsTable.$inferSelect & { topicTitle?: string | null };

// Map a stored problem row to the client-safe Problem shape. Per-option credit
// weights are NEVER sent to the client — only the option texts.
function toClientProblem(p: ProblemRow) {
  const mc = (p.mcOptions as McOption[] | null) ?? null;
  const rubric = (p.writtenRubric as WrittenRubric | null) ?? null;
  const usesOptions = p.itemType === "mc" || p.itemType === "hybrid";
  return {
    id: p.id,
    position: p.position,
    prompt: p.prompt,
    topicId: p.topicId,
    topicTitle: p.topicTitle ?? null,
    hint: p.hint ?? null,
    itemType: p.itemType as "mc" | "written" | "hybrid",
    format: p.format as Format,
    maxPoints: p.maxPoints,
    options: usesOptions && mc ? mc.map((o) => o.text) : null,
    writtenPrompt: p.itemType === "hybrid" && rubric?.prompt ? rubric.prompt : null,
  };
}

router.get("/assignments", async (_req, res) => {
  const rows = await db
    .select()
    .from(assignmentsTable)
    .orderBy(asc(assignmentsTable.weekNumber), asc(assignmentsTable.position));
  const result = await Promise.all(
    rows.map(async (a) => {
      const probs = await db
        .select({ format: problemsTable.format })
        .from(problemsTable)
        .where(eq(problemsTable.assignmentId, a.id));
      const counts: Record<Format, number> = { mcq: 0, hybrid: 0, written: 0 };
      for (const p of probs) {
        if (isFormat(p.format)) counts[p.format] += 1;
      }
      const attempts = await db
        .select()
        .from(attemptsTable)
        .where(eq(attemptsTable.assignmentId, a.id))
        .orderBy(asc(attemptsTable.id));
      const submitted = attempts.filter((x) => x.status === "submitted");
      const inProgress = attempts.find((x) => x.status === "in_progress");
      const best = submitted.reduce(
        (b, x) => (x.scorePercent != null && x.scorePercent > b ? x.scorePercent : b),
        -1,
      );
      const status: "not_started" | "in_progress" | "submitted" = inProgress
        ? "in_progress"
        : submitted.length > 0
        ? "submitted"
        : "not_started";
      const last = attempts[attempts.length - 1];
      const chosenFormat = isFormat(last?.format) ? last.format : null;
      const problemCount = chosenFormat ? counts[chosenFormat] : counts.mcq;
      return {
        id: a.id,
        kind: a.kind as "homework" | "test" | "midterm" | "final",
        title: a.title,
        weekNumber: a.weekNumber,
        problemCount,
        isTimed: a.isTimed,
        timeLimitMinutes: a.timeLimitMinutes,
        status,
        bestScore: best < 0 ? null : best,
        lastAttemptId: last?.id ?? null,
        chosenFormat,
      };
    }),
  );
  res.json(ListAssignmentsResponse.parse(result));
});

router.get("/assignments/:assignmentId", async (req, res): Promise<void> => {
  const id = parseIdParam(req.params.assignmentId);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "invalid id" });
    return;
  }
  const [a] = await db.select().from(assignmentsTable).where(eq(assignmentsTable.id, id));
  if (!a) {
    res.status(404).json({ error: "not found" });
    return;
  }
  const probs = await db
    .select({ format: problemsTable.format })
    .from(problemsTable)
    .where(eq(problemsTable.assignmentId, id));
  const counts: Record<Format, number> = { mcq: 0, hybrid: 0, written: 0 };
  for (const p of probs) {
    if (isFormat(p.format)) counts[p.format] += 1;
  }
  const formats = FORMATS.filter((f) => counts[f] > 0).map((f) => ({
    format: f,
    itemCount: counts[f],
    label: FORMAT_LABELS[f],
  }));

  const attempts = await db
    .select()
    .from(attemptsTable)
    .where(eq(attemptsTable.assignmentId, id))
    .orderBy(asc(attemptsTable.id));
  const submitted = attempts.filter((x) => x.status === "submitted");
  const inProgress = attempts.find((x) => x.status === "in_progress");
  const best = submitted.reduce(
    (b, x) => (x.scorePercent != null && x.scorePercent > b ? x.scorePercent : b),
    -1,
  );
  const status: "not_started" | "in_progress" | "submitted" = inProgress
    ? "in_progress"
    : submitted.length > 0
    ? "submitted"
    : "not_started";
  const last = attempts[attempts.length - 1];
  const chosenFormat = isFormat(last?.format) ? last.format : null;

  res.json(
    GetAssignmentResponse.parse({
      id: a.id,
      kind: a.kind as "homework" | "test" | "midterm" | "final",
      title: a.title,
      weekNumber: a.weekNumber,
      isTimed: a.isTimed,
      timeLimitMinutes: a.timeLimitMinutes,
      instructions: a.instructions,
      formats,
      status,
      chosenFormat,
      lastAttemptId: last?.id ?? null,
      bestScore: best < 0 ? null : best,
    }),
  );
});

router.get(
  "/assignments/:assignmentId/problems",
  async (req, res): Promise<void> => {
    const id = parseIdParam(req.params.assignmentId);
    if (!Number.isFinite(id)) {
      res.status(400).json({ error: "invalid id" });
      return;
    }
    const rows = await db
      .select({
        id: problemsTable.id,
        position: problemsTable.position,
        prompt: problemsTable.prompt,
        itemType: problemsTable.itemType,
        format: problemsTable.format,
      })
      .from(problemsTable)
      .where(eq(problemsTable.assignmentId, id))
      .orderBy(asc(problemsTable.format), asc(problemsTable.position));
    res.json(
      ListAssignmentProblemsResponse.parse(
        rows.map((r) => ({
          id: r.id,
          position: r.position,
          prompt: r.prompt,
          itemType: r.itemType as "mc" | "written" | "hybrid",
          format: r.format as Format,
        })),
      ),
    );
  },
);

async function loadAttempt(attemptId: number) {
  const [attempt] = await db
    .select()
    .from(attemptsTable)
    .where(eq(attemptsTable.id, attemptId));
  if (!attempt) return null;
  const format: Format = isFormat(attempt.format) ? attempt.format : "written";
  const problems = await db
    .select({
      id: problemsTable.id,
      assignmentId: problemsTable.assignmentId,
      topicId: problemsTable.topicId,
      position: problemsTable.position,
      format: problemsTable.format,
      itemType: problemsTable.itemType,
      maxPoints: problemsTable.maxPoints,
      prompt: problemsTable.prompt,
      correctAnswer: problemsTable.correctAnswer,
      explanation: problemsTable.explanation,
      hint: problemsTable.hint,
      mcOptions: problemsTable.mcOptions,
      writtenRubric: problemsTable.writtenRubric,
      topicTitle: topicsTable.title,
    })
    .from(problemsTable)
    .leftJoin(topicsTable, eq(problemsTable.topicId, topicsTable.id))
    .where(
      and(
        eq(problemsTable.assignmentId, attempt.assignmentId),
        eq(problemsTable.format, format),
      ),
    )
    .orderBy(asc(problemsTable.position));
  const answers = await db
    .select()
    .from(answersTable)
    .where(eq(answersTable.attemptId, attemptId));
  return {
    id: attempt.id,
    assignmentId: attempt.assignmentId,
    status: attempt.status as "in_progress" | "submitted",
    format,
    startedAt: attempt.startedAt.toISOString(),
    submittedAt: attempt.submittedAt?.toISOString() ?? null,
    deadlineAt: attempt.deadlineAt?.toISOString() ?? null,
    problems: problems.map((p) => toClientProblem(p as ProblemRow)),
    answers: answers.map((x) => ({
      problemId: x.problemId,
      answer: x.answer,
      selectedIndex: x.selectedIndex ?? null,
      keystrokeCount: x.keystrokeCount,
      eraseCount: x.eraseCount,
    })),
  };
}

router.post("/assignments/:assignmentId/start", async (req, res): Promise<void> => {
  const id = parseIdParam(req.params.assignmentId);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "invalid id" });
    return;
  }
  const parsed = StartAssignmentAttemptBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const requestedFormat = parsed.data.format as Format;

  const [a] = await db.select().from(assignmentsTable).where(eq(assignmentsTable.id, id));
  if (!a) {
    res.status(404).json({ error: "assignment not found" });
    return;
  }

  const attempts = await db
    .select()
    .from(attemptsTable)
    .where(eq(attemptsTable.assignmentId, id))
    .orderBy(asc(attemptsTable.id));

  // Single-attempt lock: once an attempt has been submitted, the homework is
  // closed for good — no new attempt and no format change.
  const submitted = attempts.find((x) => x.status === "submitted");
  if (submitted) {
    res.status(409).json({
      error: "This homework has already been submitted. Each homework allows one attempt.",
      lastAttemptId: submitted.id,
    });
    return;
  }

  // Resume any in-progress attempt (keep its original format).
  const existing = attempts.find((x) => x.status === "in_progress");
  if (existing) {
    const state = await loadAttempt(existing.id);
    res.json(StartAssignmentAttemptResponse.parse(state));
    return;
  }

  // Verify the requested format actually has items.
  const [{ n } = { n: 0 }] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(problemsTable)
    .where(and(eq(problemsTable.assignmentId, id), eq(problemsTable.format, requestedFormat)));
  if (!n || n <= 0) {
    res.status(400).json({ error: `No problems for format ${requestedFormat}` });
    return;
  }

  const deadlineAt =
    a.isTimed && a.timeLimitMinutes
      ? new Date(Date.now() + a.timeLimitMinutes * 60_000)
      : null;
  const [created] = await db
    .insert(attemptsTable)
    .values({ assignmentId: id, status: "in_progress", format: requestedFormat, deadlineAt })
    .returning();
  if (!created) {
    res.status(500).json({ error: "failed to create" });
    return;
  }
  const state = await loadAttempt(created.id);
  res.json(StartAssignmentAttemptResponse.parse(state));
});

router.get("/assignments/attempts/:attemptId", async (req, res): Promise<void> => {
  const id = parseIdParam(req.params.attemptId);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "invalid id" });
    return;
  }
  const state = await loadAttempt(id);
  if (!state) {
    res.status(404).json({ error: "attempt not found" });
    return;
  }
  res.json(GetAttemptResponse.parse(state));
});

router.put("/assignments/attempts/:attemptId/answer", async (req, res): Promise<void> => {
  const id = parseIdParam(req.params.attemptId);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "invalid id" });
    return;
  }
  const parsed = SaveAnswerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { problemId, answer, selectedIndex, trace } = parsed.data;

  const [attempt] = await db
    .select()
    .from(attemptsTable)
    .where(eq(attemptsTable.id, id));
  if (!attempt) {
    res.status(404).json({ error: "attempt not found" });
    return;
  }
  if (attempt.status !== "in_progress") {
    res.status(400).json({ error: "attempt already submitted" });
    return;
  }
  if (attempt.deadlineAt && new Date() > attempt.deadlineAt) {
    res.status(403).json({ error: "time limit exceeded" });
    return;
  }

  const [existing] = await db
    .select()
    .from(answersTable)
    .where(and(eq(answersTable.attemptId, id), eq(answersTable.problemId, problemId)));

  const values = {
    attemptId: id,
    problemId,
    answer: answer ?? "",
    selectedIndex: selectedIndex ?? null,
    keystrokeCount: trace?.keystrokeCount ?? 0,
    eraseCount: trace?.eraseCount ?? 0,
    bulkInsertCount: trace?.bulkInsertCount ?? 0,
    longestBulkInsertChars: trace?.longestBulkInsertChars ?? 0,
    rewriteSegments: trace?.rewriteSegments ?? 0,
    durationMs: trace?.durationMs ?? 0,
    updatedAt: new Date(),
  };
  if (existing) {
    await db.update(answersTable).set(values).where(eq(answersTable.id, existing.id));
  } else {
    await db.insert(answersTable).values(values);
  }
  res.json({ ok: true });
});

router.post("/assignments/attempts/:attemptId/submit", async (req, res): Promise<void> => {
  const id = parseIdParam(req.params.attemptId);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "invalid id" });
    return;
  }
  const skipDetection =
    (req.body as { skipDetection?: boolean } | undefined)?.skipDetection === true;
  const [attempt] = await db
    .select()
    .from(attemptsTable)
    .where(eq(attemptsTable.id, id));
  if (!attempt) {
    res.status(404).json({ error: "attempt not found" });
    return;
  }
  // Single-attempt lock: a submitted attempt cannot be re-graded.
  if (attempt.status === "submitted") {
    res.status(409).json({ error: "attempt already submitted" });
    return;
  }
  const format: Format = isFormat(attempt.format) ? attempt.format : "written";
  const problems = await db
    .select()
    .from(problemsTable)
    .where(
      and(
        eq(problemsTable.assignmentId, attempt.assignmentId),
        eq(problemsTable.format, format),
      ),
    )
    .orderBy(asc(problemsTable.position));
  const answers = await db
    .select()
    .from(answersTable)
    .where(eq(answersTable.attemptId, id));
  const byProblem = new Map(answers.map((a) => [a.problemId, a]));

  const perProblem = [];
  const detection = [];
  let earned = 0;
  let totalPoints = 0;
  for (const p of problems) {
    const a = byProblem.get(p.id);
    const userAnswer = a?.answer ?? "";
    const selectedIndex = a?.selectedIndex ?? null;
    const mc = (p.mcOptions as McOption[] | null) ?? null;
    const rubric = (p.writtenRubric as WrittenRubric | null) ?? null;
    const maxPoints = p.maxPoints ?? 1;

    let credit = 0;
    let explanation = p.explanation;
    if (p.itemType === "mc") {
      const g = gradeMcPart(mc ?? [], selectedIndex);
      credit = g.credit;
      explanation = g.explanation;
    } else if (p.itemType === "written") {
      const g = await gradeWrittenPart({
        prompt: p.prompt,
        rubric: rubric ?? { modelAnswer: "", yieldAnchors: [], riskAnchors: [], defeatedBy: [] },
        userAnswer,
      });
      credit = g.credit;
      explanation = g.explanation;
    } else {
      // hybrid: average the MC part and the written follow-up.
      const mcRes = gradeMcPart(mc ?? [], selectedIndex);
      const wrRes = await gradeWrittenPart({
        prompt: p.prompt,
        rubric: rubric ?? { modelAnswer: "", yieldAnchors: [], riskAnchors: [], defeatedBy: [] },
        userAnswer,
      });
      credit = (mcRes.credit + wrRes.credit) / 2;
      explanation = `Multiple choice — ${mcRes.explanation} Written — ${wrRes.explanation}`;
    }

    const correct = credit >= 0.999;
    earned += credit * maxPoints;
    totalPoints += maxPoints;

    perProblem.push({
      problemId: p.id,
      correct,
      credit,
      maxPoints,
      itemType: p.itemType as "mc" | "written" | "hybrid",
      userAnswer,
      selectedIndex,
      correctAnswer: p.correctAnswer,
      explanation,
    });

    // Detection runs only on written text (mc-only items have no prose).
    const hasText = userAnswer.trim().length > 0;
    if (a && hasText && !skipDetection) {
      const det = await detect(userAnswer, {
        keystrokeCount: a.keystrokeCount,
        eraseCount: a.eraseCount,
        bulkInsertCount: a.bulkInsertCount,
        longestBulkInsertChars: a.longestBulkInsertChars,
        rewriteSegments: a.rewriteSegments,
        durationMs: a.durationMs,
      });
      detection.push({ problemId: p.id, ...det });
      await db
        .update(answersTable)
        .set({
          correct,
          creditEarned: credit,
          aiScore: det.aiScore,
          aiFlagged: det.aiFlagged,
          diachronicScore: det.diachronicScore,
          diachronicFlagged: det.diachronicFlagged,
          detectionRationale: det.rationale,
        })
        .where(eq(answersTable.id, a.id));
    } else if (a) {
      await db
        .update(answersTable)
        .set({ correct, creditEarned: credit })
        .where(eq(answersTable.id, a.id));
    }
  }

  const percent = totalPoints === 0 ? 0 : (earned / totalPoints) * 100;
  await db
    .update(attemptsTable)
    .set({
      status: "submitted",
      submittedAt: new Date(),
      scorePercent: percent,
    })
    .where(eq(attemptsTable.id, id));

  res.json(
    SubmitAttemptResponse.parse({
      attemptId: id,
      score: earned,
      total: totalPoints,
      percent,
      perProblem,
      detection,
    }),
  );
});

export default router;
