import { Router, type IRouter } from "express";
import { and, asc, eq } from "drizzle-orm";
import {
  db,
  assignmentsTable,
  attemptsTable,
  diagnosticAssessmentsTable,
  diagnosticItemsTable,
  diagnosticAttemptsTable,
  diagnosticResponsesTable,
} from "@workspace/db";
import {
  ListReasoningAssessmentsResponse,
  GetReasoningAssessmentResponse,
  StartReasoningAttemptResponse,
  SubmitReasoningAttemptResponse,
  SubmitReasoningAttemptBody,
  GetGradebookResponse,
} from "@workspace/api-zod";
import {
  scoreAssessment,
  generateFeedback,
  publicItem,
  type DiagnosticItemRow,
  type ResponseInput,
} from "../lib/reasoning";

const router: IRouter = Router();

const COURSEWORK_WEIGHT = 80;
const DIAGNOSTIC_WEIGHT = 20;

function parseIdParam(raw: unknown): number {
  const s = Array.isArray(raw) ? raw[0] : (raw as string);
  return parseInt(s ?? "", 10);
}

type Instrument = "ethical" | "critical";
type Phase = "baseline" | "unit1" | "unit2" | "unit3" | "unit4";

async function loadItems(assessmentId: number): Promise<DiagnosticItemRow[]> {
  const rows = await db
    .select()
    .from(diagnosticItemsTable)
    .where(eq(diagnosticItemsTable.assessmentId, assessmentId))
    .orderBy(asc(diagnosticItemsTable.position));
  return rows.map((r) => ({
    id: r.id,
    position: r.position,
    type: r.type as "dilemma" | "mcq",
    prompt: r.prompt,
    payload: r.payload,
    scoring: r.scoring,
  }));
}

router.get("/reasoning/assessments", async (_req, res) => {
  const assessments = await db
    .select()
    .from(diagnosticAssessmentsTable)
    .orderBy(asc(diagnosticAssessmentsTable.position));
  const result = await Promise.all(
    assessments.map(async (a) => {
      const items = await db
        .select({ id: diagnosticItemsTable.id })
        .from(diagnosticItemsTable)
        .where(eq(diagnosticItemsTable.assessmentId, a.id));
      const attempts = await db
        .select()
        .from(diagnosticAttemptsTable)
        .where(eq(diagnosticAttemptsTable.assessmentId, a.id))
        .orderBy(asc(diagnosticAttemptsTable.id));
      const submitted = attempts.find((x) => x.status === "submitted");
      const inProgress = attempts.find((x) => x.status === "in_progress");
      const status: "not_started" | "in_progress" | "passed" = submitted
        ? "passed"
        : inProgress
        ? "in_progress"
        : "not_started";
      const last = attempts[attempts.length - 1];
      return {
        id: a.id,
        instrument: a.instrument as Instrument,
        phase: a.phase as Phase,
        title: a.title,
        subtitle: a.subtitle,
        itemCount: items.length,
        status,
        lastAttemptId: last?.id ?? null,
      };
    }),
  );
  res.json(ListReasoningAssessmentsResponse.parse(result));
});

router.get("/reasoning/assessments/:assessmentId", async (req, res): Promise<void> => {
  const id = parseIdParam(req.params.assessmentId);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "invalid id" });
    return;
  }
  const [a] = await db
    .select()
    .from(diagnosticAssessmentsTable)
    .where(eq(diagnosticAssessmentsTable.id, id));
  if (!a) {
    res.status(404).json({ error: "not found" });
    return;
  }
  const items = await loadItems(id);
  res.json(
    GetReasoningAssessmentResponse.parse({
      id: a.id,
      instrument: a.instrument as Instrument,
      phase: a.phase as Phase,
      title: a.title,
      subtitle: a.subtitle,
      instructions: a.instructions,
      items: items.map(publicItem),
    }),
  );
});

router.post("/reasoning/assessments/:assessmentId/start", async (req, res): Promise<void> => {
  const id = parseIdParam(req.params.assessmentId);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "invalid id" });
    return;
  }
  const [a] = await db
    .select()
    .from(diagnosticAssessmentsTable)
    .where(eq(diagnosticAssessmentsTable.id, id));
  if (!a) {
    res.status(404).json({ error: "assessment not found" });
    return;
  }

  // Resume an in-progress attempt, or surface the already-passed attempt.
  const existing = await db
    .select()
    .from(diagnosticAttemptsTable)
    .where(eq(diagnosticAttemptsTable.assessmentId, id))
    .orderBy(asc(diagnosticAttemptsTable.id));
  const reusable =
    existing.find((x) => x.status === "in_progress") ??
    existing.find((x) => x.status === "submitted");
  if (reusable) {
    res.json(
      StartReasoningAttemptResponse.parse({
        id: reusable.id,
        assessmentId: reusable.assessmentId,
        status: reusable.status as "in_progress" | "submitted",
        startedAt: reusable.startedAt.toISOString(),
        submittedAt: reusable.submittedAt?.toISOString() ?? null,
        passed: reusable.passed,
        feedback: reusable.feedback,
      }),
    );
    return;
  }

  const [created] = await db
    .insert(diagnosticAttemptsTable)
    .values({ assessmentId: id, status: "in_progress" })
    .returning();
  if (!created) {
    res.status(500).json({ error: "failed to create" });
    return;
  }
  res.json(
    StartReasoningAttemptResponse.parse({
      id: created.id,
      assessmentId: created.assessmentId,
      status: "in_progress",
      startedAt: created.startedAt.toISOString(),
      submittedAt: null,
      passed: null,
      feedback: null,
    }),
  );
});

router.post("/reasoning/assessments/:assessmentId/submit", async (req, res): Promise<void> => {
  const id = parseIdParam(req.params.assessmentId);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "invalid id" });
    return;
  }
  const parsed = SubmitReasoningAttemptBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [a] = await db
    .select()
    .from(diagnosticAssessmentsTable)
    .where(eq(diagnosticAssessmentsTable.id, id));
  if (!a) {
    res.status(404).json({ error: "assessment not found" });
    return;
  }

  const responses = parsed.data.responses as ResponseInput[];
  const items = await loadItems(id);
  const instrument = a.instrument as Instrument;
  const summary = scoreAssessment(instrument, items, responses);
  const feedback = await generateFeedback(instrument, a.title, summary);

  // Pass/Fail policy: submitting the assessment is a pass.
  const passed = true;

  // Attach to the in-progress attempt if present, else create one.
  const existing = await db
    .select()
    .from(diagnosticAttemptsTable)
    .where(
      and(
        eq(diagnosticAttemptsTable.assessmentId, id),
        eq(diagnosticAttemptsTable.status, "in_progress"),
      ),
    )
    .orderBy(asc(diagnosticAttemptsTable.id));
  let attemptId: number;
  const target = existing[0];
  if (target) {
    attemptId = target.id;
    await db
      .update(diagnosticAttemptsTable)
      .set({
        status: "submitted",
        passed,
        feedback,
        responses,
        scoreSummary: summary,
        submittedAt: new Date(),
      })
      .where(eq(diagnosticAttemptsTable.id, target.id));
  } else {
    const [created] = await db
      .insert(diagnosticAttemptsTable)
      .values({
        assessmentId: id,
        status: "submitted",
        passed,
        feedback,
        responses,
        scoreSummary: summary,
        submittedAt: new Date(),
      })
      .returning();
    if (!created) {
      res.status(500).json({ error: "failed to record attempt" });
      return;
    }
    attemptId = created.id;
  }

  // Persist one normalized row per answered item (replacing any prior rows for
  // this attempt). isCorrect is set for mcq items, left null for dilemmas.
  await db
    .delete(diagnosticResponsesTable)
    .where(eq(diagnosticResponsesTable.attemptId, attemptId));
  const byItem = new Map(responses.map((r) => [r.itemId, r]));
  const rows = items.map((item) => {
    const resp = byItem.get(item.id);
    let isCorrect: boolean | null = null;
    if (item.type === "mcq") {
      const sc = item.scoring as { correctIndex?: number };
      isCorrect =
        typeof resp?.selectedIndex === "number" &&
        resp.selectedIndex === sc.correctIndex;
    }
    return {
      attemptId,
      itemId: item.id,
      selectedIndex: resp?.selectedIndex ?? null,
      decisionIndex: resp?.decisionIndex ?? null,
      ratings: resp?.ratings ?? null,
      ranking: resp?.ranking ?? null,
      isCorrect,
    };
  });
  if (rows.length > 0) {
    await db.insert(diagnosticResponsesTable).values(rows);
  }

  res.json(
    SubmitReasoningAttemptResponse.parse({
      attemptId,
      passed,
      feedback,
      headline: summary.headline,
      metrics: summary.metrics,
    }),
  );
});

router.get("/reasoning/grades", async (_req, res) => {
  // ---- Coursework (80%) ----
  const assignments = await db
    .select()
    .from(assignmentsTable)
    .orderBy(asc(assignmentsTable.weekNumber), asc(assignmentsTable.position));
  const coursework = await Promise.all(
    assignments.map(async (a) => {
      const attempts = await db
        .select()
        .from(attemptsTable)
        .where(eq(attemptsTable.assignmentId, a.id));
      const submitted = attempts.filter((x) => x.status === "submitted");
      const inProgress = attempts.some((x) => x.status === "in_progress");
      const best = submitted.reduce(
        (b, x) => (x.scorePercent != null && x.scorePercent > b ? x.scorePercent : b),
        -1,
      );
      const status: "not_started" | "in_progress" | "submitted" =
        submitted.length > 0 ? "submitted" : inProgress ? "in_progress" : "not_started";
      return {
        id: a.id,
        kind: a.kind as "homework" | "test" | "midterm" | "final",
        title: a.title,
        weekNumber: a.weekNumber,
        status,
        bestScore: best < 0 ? null : best,
      };
    }),
  );
  const courseworkAvg =
    coursework.length === 0
      ? 0
      : coursework.reduce((s, c) => s + (c.bestScore ?? 0), 0) / coursework.length;

  // ---- Diagnostics (20%) ----
  const assessments = await db
    .select()
    .from(diagnosticAssessmentsTable)
    .orderBy(asc(diagnosticAssessmentsTable.position));
  const reasoning = await Promise.all(
    assessments.map(async (a) => {
      const attempts = await db
        .select()
        .from(diagnosticAttemptsTable)
        .where(eq(diagnosticAttemptsTable.assessmentId, a.id));
      const passed = attempts.some((x) => x.status === "submitted" && x.passed);
      const inProgress = attempts.some((x) => x.status === "in_progress");
      const status: "not_started" | "in_progress" | "passed" = passed
        ? "passed"
        : inProgress
        ? "in_progress"
        : "not_started";
      return {
        id: a.id,
        instrument: a.instrument as Instrument,
        phase: a.phase as Phase,
        title: a.title,
        status,
      };
    }),
  );
  const passedCount = reasoning.filter((r) => r.status === "passed").length;
  const reasoningPct =
    reasoning.length === 0 ? 0 : (passedCount / reasoning.length) * 100;

  const courseworkEarned = (courseworkAvg / 100) * COURSEWORK_WEIGHT;
  const diagnosticsEarned = (reasoningPct / 100) * DIAGNOSTIC_WEIGHT;
  const overall = courseworkEarned + diagnosticsEarned;

  const letterGrade =
    overall >= 90
      ? "A"
      : overall >= 80
      ? "B"
      : overall >= 70
      ? "C"
      : overall >= 60
      ? "D"
      : "F";

  res.json(
    GetGradebookResponse.parse({
      overallPercent: Math.round(overall * 10) / 10,
      letterGrade,
      components: [
        {
          key: "coursework",
          label: "Coursework",
          weightPercent: COURSEWORK_WEIGHT,
          earnedPercent: Math.round(courseworkEarned * 10) / 10,
          detail: `Average ${Math.round(courseworkAvg)}% across ${coursework.length} assignments`,
        },
        {
          key: "diagnostics",
          label: "Diagnostic assessments",
          weightPercent: DIAGNOSTIC_WEIGHT,
          earnedPercent: Math.round(diagnosticsEarned * 10) / 10,
          detail: `${passedCount} of ${reasoning.length} assessments passed`,
        },
      ],
      coursework,
      reasoning,
    }),
  );
});

export default router;
