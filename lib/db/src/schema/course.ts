import {
  pgTable,
  serial,
  integer,
  text,
  boolean,
  timestamp,
  jsonb,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const topicsTable = pgTable("topics", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  weekNumber: integer("week_number").notNull(),
  blurb: text("blurb"),
  position: integer("position").notNull().default(0),
});

export const lecturesTable = pgTable("lectures", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id")
    .notNull()
    .references(() => topicsTable.id, { onDelete: "cascade" }),
  weekNumber: integer("week_number").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  bodyMedium: text("body_medium"),
  bodyLong: text("body_long"),
});

export const assignmentsTable = pgTable("assignments", {
  id: serial("id").primaryKey(),
  kind: text("kind").notNull(), // homework | test | midterm | final
  title: text("title").notNull(),
  weekNumber: integer("week_number").notNull(),
  position: integer("position").notNull().default(0),
  isTimed: boolean("is_timed").notNull().default(false),
  timeLimitMinutes: integer("time_limit_minutes"),
  instructions: text("instructions"),
});

export const problemsTable = pgTable("problems", {
  id: serial("id").primaryKey(),
  assignmentId: integer("assignment_id")
    .notNull()
    .references(() => assignmentsTable.id, { onDelete: "cascade" }),
  topicId: integer("topic_id")
    .notNull()
    .references(() => topicsTable.id),
  position: integer("position").notNull(),
  prompt: text("prompt").notNull(),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  hint: text("hint"),
});

export const attemptsTable = pgTable("attempts", {
  id: serial("id").primaryKey(),
  assignmentId: integer("assignment_id")
    .notNull()
    .references(() => assignmentsTable.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("in_progress"), // in_progress | submitted
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }),
  deadlineAt: timestamp("deadline_at", { withTimezone: true }),
  scorePercent: doublePrecision("score_percent"),
});

export const answersTable = pgTable("answers", {
  id: serial("id").primaryKey(),
  attemptId: integer("attempt_id")
    .notNull()
    .references(() => attemptsTable.id, { onDelete: "cascade" }),
  problemId: integer("problem_id")
    .notNull()
    .references(() => problemsTable.id, { onDelete: "cascade" }),
  answer: text("answer").notNull().default(""),
  correct: boolean("correct"),
  keystrokeCount: integer("keystroke_count").notNull().default(0),
  eraseCount: integer("erase_count").notNull().default(0),
  bulkInsertCount: integer("bulk_insert_count").notNull().default(0),
  longestBulkInsertChars: integer("longest_bulk_insert_chars").notNull().default(0),
  rewriteSegments: integer("rewrite_segments").notNull().default(0),
  durationMs: integer("duration_ms").notNull().default(0),
  aiScore: doublePrecision("ai_score"),
  aiFlagged: boolean("ai_flagged"),
  diachronicScore: doublePrecision("diachronic_score"),
  diachronicFlagged: boolean("diachronic_flagged"),
  detectionRationale: text("detection_rationale"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const practiceSessionsTable = pgTable("practice_sessions", {
  id: serial("id").primaryKey(),
  weekNumber: integer("week_number"),
  topicId: integer("topic_id"),
  tutorEnabled: boolean("tutor_enabled").notNull().default(false),
  focusOnWeaknesses: boolean("focus_on_weaknesses").notNull().default(true),
  difficulty: doublePrecision("difficulty").notNull().default(2.0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const practiceProblemsTable = pgTable("practice_problems", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => practiceSessionsTable.id, { onDelete: "cascade" }),
  topicId: integer("topic_id").notNull(),
  prompt: text("prompt").notNull(),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  difficulty: doublePrecision("difficulty").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const practiceAttemptsTable = pgTable("practice_attempts", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => practiceSessionsTable.id, { onDelete: "cascade" }),
  problemId: integer("problem_id")
    .notNull()
    .references(() => practiceProblemsTable.id, { onDelete: "cascade" }),
  topicId: integer("topic_id").notNull(),
  answer: text("answer").notNull(),
  correct: boolean("correct").notNull(),
  difficulty: doublePrecision("difficulty").notNull(),
  trace: jsonb("trace"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Diagnostic reasoning assessments (embedded program-level instruments).
// Two original instruments — Ethical Reasoning (DIT-style) and Critical
// Reasoning (CCTST-style) — each administered 5 times (baseline + after each
// of the 4 units) with mutually unique items. Pass/Fail: submitting = pass.
// ---------------------------------------------------------------------------

export const diagnosticAssessmentsTable = pgTable("diagnostic_assessments", {
  id: serial("id").primaryKey(),
  instrument: text("instrument").notNull(), // ethical | critical
  phase: text("phase").notNull(), // baseline | unit1 | unit2 | unit3 | unit4
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  instructions: text("instructions").notNull(),
  position: integer("position").notNull().default(0),
});

export const diagnosticItemsTable = pgTable("diagnostic_items", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id")
    .notNull()
    .references(() => diagnosticAssessmentsTable.id, { onDelete: "cascade" }),
  position: integer("position").notNull(),
  type: text("type").notNull(), // dilemma | mcq
  prompt: text("prompt").notNull(),
  // Public payload sent to the client: for mcq -> { options: string[] };
  // for dilemma -> { decisionOptions: string[], considerations: string[] }.
  payload: jsonb("payload").notNull(),
  // Hidden scoring key, never sent to the client: for mcq ->
  // { correctIndex, skillArea }; for dilemma -> { stages: string[], rankCount }.
  scoring: jsonb("scoring").notNull(),
});

export const diagnosticAttemptsTable = pgTable("diagnostic_attempts", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id")
    .notNull()
    .references(() => diagnosticAssessmentsTable.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("in_progress"), // in_progress | submitted
  passed: boolean("passed"),
  feedback: text("feedback"),
  responses: jsonb("responses"),
  scoreSummary: jsonb("score_summary"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }),
});
