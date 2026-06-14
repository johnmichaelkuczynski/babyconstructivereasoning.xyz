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

// Key/value bookkeeping for the seeder. Stores the content version of the
// currently-seeded curriculum so that a republished build whose seed content
// changed can detect the mismatch on boot and re-seed automatically, instead
// of relying solely on the presence of a marker topic.
export const seedMetaTable = pgTable("seed_meta", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

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
  bodyCustom: text("body_custom"),
  customInstruction: text("custom_instruction"),
});

export const assignmentsTable = pgTable("assignments", {
  id: serial("id").primaryKey(),
  // Constructive Critical Reasoning is homework-only. `kind` is retained for
  // back-compat but every graded assessment is a "homework" (one per section).
  kind: text("kind").notNull(), // homework
  title: text("title").notNull(),
  weekNumber: integer("week_number").notNull(),
  position: integer("position").notNull().default(0),
  isTimed: boolean("is_timed").notNull().default(false),
  timeLimitMinutes: integer("time_limit_minutes"),
  instructions: text("instructions"),
});

// Each section's homework is authored in all three answer formats up front; the
// student picks ONE format at start, and only that format's problems are shown.
//   - itemType "mc": one zero-credit dodge option + graded live options on a
//     descending partial-credit gradient. Per-option credit weights live in
//     `mcOptions` AS DATA (never hardcoded), so they're tunable per item.
//   - itemType "written": graded by an AI rubric on Yield + Risk (minus a
//     penalty for claims the data actively defeats). `writtenRubric` carries
//     the model answer and the anchors.
//   - itemType "hybrid": an MC part plus a short written part; the item's
//     credit is the sum of the two parts.
export const problemsTable = pgTable("problems", {
  id: serial("id").primaryKey(),
  assignmentId: integer("assignment_id")
    .notNull()
    .references(() => assignmentsTable.id, { onDelete: "cascade" }),
  topicId: integer("topic_id")
    .notNull()
    .references(() => topicsTable.id),
  position: integer("position").notNull(),
  // Which homework format this problem belongs to: mcq | hybrid | written.
  format: text("format").notNull().default("written"),
  // Item shape: mc | written | hybrid.
  itemType: text("item_type").notNull().default("written"),
  // Relative point value of this item within its format set.
  maxPoints: doublePrecision("max_points").notNull().default(1),
  prompt: text("prompt").notNull(),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  hint: text("hint"),
  // For mc / hybrid: [{ text: string, credit: number (0..1), rationale?: string }].
  // Exactly one option has credit 0 (the dodge); the rest descend from the
  // best (credit 1) by explanatory yield + falsifiable commitment.
  mcOptions: jsonb("mc_options"),
  // For written / hybrid: { modelAnswer, yieldAnchors[], riskAnchors[], defeatedBy[] }.
  writtenRubric: jsonb("written_rubric"),
});

// Single-row, operator-tunable course configuration. Controls how much each
// answer format is worth and how many diagnostics a student must complete.
export const courseSettingsTable = pgTable("course_settings", {
  id: integer("id").primaryKey().default(1),
  // Relative point value of each section by the format the student chose.
  // Defaults are all equal (1.0) so every section is worth 1/8 of the grade
  // regardless of which format was taken.
  formatWeightMcq: doublePrecision("format_weight_mcq").notNull().default(1),
  formatWeightHybrid: doublePrecision("format_weight_hybrid").notNull().default(1),
  formatWeightWritten: doublePrecision("format_weight_written").notNull().default(1),
  // Minimum number of diagnostic sets a student must complete to satisfy the
  // (ungraded) diagnostic requirement.
  minDiagnostics: integer("min_diagnostics").notNull().default(4),
});

export const attemptsTable = pgTable("attempts", {
  id: serial("id").primaryKey(),
  assignmentId: integer("assignment_id")
    .notNull()
    .references(() => assignmentsTable.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("in_progress"), // in_progress | submitted
  // The single answer format the student picked at start: mcq | hybrid | written.
  // Only problems of this format are shown and graded for the attempt.
  format: text("format"),
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
  // For mc / hybrid items: the option index the student selected.
  selectedIndex: integer("selected_index"),
  correct: boolean("correct"),
  // Partial credit earned on this item in [0, 1] (inverted CCR scale).
  creditEarned: doublePrecision("credit_earned"),
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
  // When set, this session is an infinite practice version of a specific graded
  // assignment (homework/test/midterm/final) rather than open topic practice.
  assignmentId: integer("assignment_id").references(() => assignmentsTable.id, {
    onDelete: "cascade",
  }),
  mode: text("mode").notNull().default("topic"), // topic | assignment
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
// Diagnostic practice checks (subject-relevant, ungraded self-assessments).
// Two instruments — AI Knowledge (subject) and General Reasoning (reasoning) —
// offered across 4 phases (before / third1 / third2 / after) so students can
// self-check anytime. Unlimited retakes with fresh questions; never graded.
// ---------------------------------------------------------------------------

export const diagnosticAssessmentsTable = pgTable("diagnostic_assessments", {
  id: serial("id").primaryKey(),
  instrument: text("instrument").notNull(), // subject | reasoning
  phase: text("phase").notNull(), // before | third1 | third2 | after
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
  // Null for the seeded "template" items (the canonical question bank used for
  // the first take and as the generation template). For a retake, fresh items
  // are generated per attempt and tagged with that attempt's id so every
  // retake gets different questions of the same kind. These cascade-delete
  // with their attempt.
  attemptId: integer("attempt_id").references(
    () => diagnosticAttemptsTable.id,
    { onDelete: "cascade" },
  ),
  position: integer("position").notNull(),
  type: text("type").notNull(), // mcq | open
  prompt: text("prompt").notNull(),
  // Public payload sent to the client: for mcq -> { options: string[] };
  // for open -> {} (the prompt is the whole question).
  payload: jsonb("payload").notNull(),
  // Hidden scoring key, never sent to the client: for mcq ->
  // { correctIndex, skillArea? }; for open -> { modelAnswer }.
  scoring: jsonb("scoring").notNull(),
});

export const diagnosticAttemptsTable = pgTable("diagnostic_attempts", {
  id: serial("id").primaryKey(),
  assessmentId: integer("assessment_id")
    .notNull()
    .references(() => diagnosticAssessmentsTable.id, { onDelete: "cascade" }),
  status: text("status").notNull().default("in_progress"), // in_progress | submitted
  format: text("format"), // mcq | hybrid | written — answer format the student picked at start
  length: text("length"), // short | medium | long — number of questions the student picked at start
  passed: boolean("passed"),
  feedback: text("feedback"),
  responses: jsonb("responses"),
  scoreSummary: jsonb("score_summary"),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }),
});

// Per-item responses for a submitted attempt. The full response set is also
// stored as JSON on the attempt for convenience, but this normalized table
// keeps one row per answered item so responses can be queried per item.
// Rows cascade-delete with their parent attempt (and with the item).
export const diagnosticResponsesTable = pgTable("diagnostic_responses", {
  id: serial("id").primaryKey(),
  attemptId: integer("attempt_id")
    .notNull()
    .references(() => diagnosticAttemptsTable.id, { onDelete: "cascade" }),
  itemId: integer("item_id")
    .notNull()
    .references(() => diagnosticItemsTable.id, { onDelete: "cascade" }),
  selectedIndex: integer("selected_index"), // mcq — chosen option index
  decisionIndex: integer("decision_index"), // legacy/unused — kept nullable, no longer written
  ratings: jsonb("ratings"), // legacy/unused — kept nullable, no longer written
  ranking: jsonb("ranking"), // legacy/unused — kept nullable, no longer written
  text: text("response_text"), // open — the student's short typed answer
  isCorrect: boolean("is_correct"), // mcq + open — null when unanswered
});
