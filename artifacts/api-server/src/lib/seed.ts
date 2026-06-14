import { db } from "@workspace/db";
import {
  topicsTable,
  lecturesTable,
  assignmentsTable,
  problemsTable,
  seedMetaTable,
} from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { logger } from "./logger";
import { SECTIONS, type HomeworkItem } from "./homeworkContent";

// Content version of the seeded curriculum. BUMP THIS whenever the TOPICS or
// ASSIGNMENTS content below changes. On boot, seedIfEmpty compares this against
// the value stored in seed_meta; a mismatch forces a full re-seed, so content
// edits self-heal in every environment (including a republished production)
// without a manual database wipe.
const SEED_CONTENT_VERSION = "2026-06-14-ccr-v1";

// First CCR section slug — used as the marker topic that signals the current
// curriculum is seeded. A database holding the prior curriculum will lack this
// slug, so the seed reconciler replaces it on boot.
const MARKER_TOPIC_SLUG = SECTIONS[0]!.slug;

type SeedTopic = {
  slug: string;
  title: string;
  weekNumber: number;
  blurb: string;
  lectureTitle: string;
  body: string;
};

// The eight Constructive Critical Reasoning sections become the course topics.
// Each section's lecture is the short-depth body; medium/long are generated on
// demand by the lecture route.
const TOPICS: SeedTopic[] = SECTIONS.map((s) => ({
  slug: s.slug,
  title: s.title,
  weekNumber: s.weekNumber,
  blurb: s.blurb,
  lectureTitle: s.lectureTitle,
  body: s.body,
}));

type SeedProblem = {
  topicSlug: string;
  format: "mcq" | "hybrid" | "written";
  itemType: "mc" | "written" | "hybrid";
  maxPoints: number;
  prompt: string;
  correctAnswer: string;
  explanation: string;
  hint?: string;
  mcOptions?: { text: string; credit: number }[] | null;
  writtenRubric?: HomeworkItem["writtenRubric"] | null;
};

type SeedAssignment = {
  kind: "homework";
  title: string;
  weekNumber: number;
  isTimed: boolean;
  timeLimitMinutes: number | null;
  instructions: string;
  problems: SeedProblem[];
};

const HOMEWORK_INSTRUCTIONS =
  "One homework for this section. At the start you pick a single answer format — " +
  "Multiple choice (15 questions), Hybrid (9 questions: multiple choice plus a short written follow-up), " +
  "or Written (5 questions) — and you get one attempt that locks the moment you submit. " +
  "Constructive Critical Reasoning rewards the boldest conclusion the evidence actually supports: " +
  "name a concrete mechanism and the cheap test that would disconfirm it. The cautious " +
  "\"you can't really conclude anything\" answer is a dodge and earns no credit; florid answers that " +
  "commit to nothing score low.";

// Flatten one authored homework item into a stored problem of the given format.
function toSeedProblem(
  item: HomeworkItem,
  topicSlug: string,
  format: "mcq" | "hybrid" | "written",
): SeedProblem {
  const usesOptions = item.itemType === "mc" || item.itemType === "hybrid";
  const usesRubric = item.itemType === "written" || item.itemType === "hybrid";
  return {
    topicSlug,
    format,
    itemType: item.itemType,
    maxPoints: 1,
    prompt: item.prompt,
    correctAnswer: item.correctAnswer,
    explanation: item.explanation,
    hint: item.hint,
    mcOptions: usesOptions && item.mcOptions ? item.mcOptions : null,
    writtenRubric: usesRubric && item.writtenRubric ? item.writtenRubric : null,
  };
}

// One graded homework per section. All three answer formats are authored up
// front and stored together; the student chooses ONE at start and only that
// format's problems are shown and graded.
const ASSIGNMENTS: SeedAssignment[] = SECTIONS.map((s, i) => {
  const problems: SeedProblem[] = [
    ...s.homework.mcq.map((it) => toSeedProblem(it, s.slug, "mcq")),
    ...s.homework.hybrid.map((it) => toSeedProblem(it, s.slug, "hybrid")),
    ...s.homework.written.map((it) => toSeedProblem(it, s.slug, "written")),
  ];
  return {
    kind: "homework" as const,
    title: `Homework ${i + 1} — ${s.title}`,
    weekNumber: s.weekNumber,
    isTimed: false,
    timeLimitMinutes: null,
    instructions: HOMEWORK_INSTRUCTIONS,
    problems,
  };
});

type SeedPrimer = SeedTopic;

const REASONING_PRIMERS: SeedPrimer[] = [
  {
    slug: "reasoning-primer-subject",
    title: "What the AI Knowledge check looks for",
    weekNumber: 1,
    blurb:
      "Practice primer: applying what you know about how AI actually works.",
    lectureTitle: "Primer: What the AI Knowledge check looks for",
    body: `# What the AI Knowledge check looks for

This short primer prepares you for the **AI Knowledge** check. It's practice only — it never affects your grade, you can retake it as often as you like, and you'll get fresh questions every time.

## It tests understanding, not memorizing

The questions don't ask you to recite a definition. Each one gives a short, everyday situation and asks you to *apply* what you understand about how AI works — for example, what a chatbot is really doing when it answers, or why a tool trained on narrow data struggles outside it.

## The big ideas it draws on

The check spans the whole course:

- **What AI is (and isn't)** — a pattern-finder, not a mind that understands.
- **Rules vs. learning** — fixed rules a person wrote versus patterns learned from examples.
- **Data and training** — a model is only as good as the examples it learned from.
- **Pattern recognition and neural networks** — how systems build up complex patterns from simpler ones.
- **Language models** — predicting likely next words rather than looking up verified facts.
- **Strengths, limits, and hallucination** — why confident wording isn't the same as being correct.
- **Using AI well** — giving clear context, checking results, and being honest about its use.

## How to do well

1. Read the little scenario and ask what's *actually* happening underneath.
2. Choose the option that fits how AI really works — not the one that sounds most impressive.
3. For written questions, a clear sentence or two that captures the core idea is plenty. You're never judged on length.`,
  },
  {
    slug: "reasoning-primer-reasoning",
    title: "Core clear-thinking skills",
    weekNumber: 1,
    blurb:
      "Practice primer: analysis, inference, evaluation, deduction, and induction.",
    lectureTitle: "Primer: Core clear-thinking skills",
    body: `# Core clear-thinking skills

This short primer prepares you for the **General Reasoning** check — questions that exercise five everyday thinking skills. It's practice only: it never affects your grade, you can retake it any time, and the questions are different each time. These are the same skills you use to decide what a set of facts really shows, so they matter directly for thinking clearly about what AI can and can't actually do.

## The five skills

- **Analysis** — break an argument into parts: find its **point** (the conclusion), the **reasons** given for it, and any hidden assumption it leans on. Ask: "What is this trying to convince me of, and what does it take for granted?"
- **Inference** — work out what *follows* from what you're told, and how strongly. Tell apart what *must* be true, what is *likely*, and what is only *possible*.
- **Evaluation** — judge how much the reasons actually support the point. Notice when evidence is beside the point, a source isn't trustworthy, or a step doesn't really connect.
- **Deduction** — reasoning where true starting facts *guarantee* the conclusion. If the starting facts are true, the conclusion can't be false. Watch for sneaky forms that only *look* airtight.
- **Induction** — reasoning from a few examples to a *probable* general rule or prediction. Strong induction uses many fair examples; weak induction over-generalizes from too few.

## A recurring trap: things that move together

Many tempting answers *sound* reasonable but are **not actually backed up by what you were told**. The discipline these questions reward is the same one careful thinking about technology demands: keep apart what the facts **show**, what you're **assuming**, and what only *sounds* right. Two things happening together does not prove one causes the other.

## How to do well

1. Find the **point** (conclusion) first, then the reasons.
2. Ask which of the five skills the question is testing (a hidden-assumption question is analysis; a "what follows" question is inference or deduction; a "how good is this reasoning" question is evaluation).
3. Pick the option that follows **only** from what you were given — not the one that merely sounds true or appealing.`,
  },
];

const DESIRED_PRIMER_SLUGS = new Set(REASONING_PRIMERS.map((p) => p.slug));

// All primer slugs this app has ever used. Any of these NOT in the current
// desired set is obsolete and is removed (its lecture cascades away with it),
// so a database seeded under an older design self-heals.
const ALL_PRIMER_SLUGS = [
  "reasoning-primer-subject",
  "reasoning-primer-reasoning",
  "reasoning-primer-ethical",
  "reasoning-primer-critical",
];

// Reconcile the assessment primer lectures to the current desired set: drop any
// obsolete primers, then insert or update the desired ones. Safe to run on
// every boot.
export async function seedReasoningPrimersIfMissing(): Promise<void> {
  // 1. Remove obsolete primers (deleting the topic cascades to its lecture).
  const obsolete = ALL_PRIMER_SLUGS.filter((s) => !DESIRED_PRIMER_SLUGS.has(s));
  let removed = 0;
  for (const slug of obsolete) {
    const rows = await db
      .delete(topicsTable)
      .where(eq(topicsTable.slug, slug))
      .returning({ id: topicsTable.id });
    removed += rows.length;
  }

  // 2. Upsert the desired primers.
  let added = 0;
  let updated = 0;
  for (let i = 0; i < REASONING_PRIMERS.length; i++) {
    const t = REASONING_PRIMERS[i]!;
    const existing = await db
      .select({ id: topicsTable.id })
      .from(topicsTable)
      .where(eq(topicsTable.slug, t.slug));
    const found = existing[0];
    if (found) {
      await db
        .update(topicsTable)
        .set({ title: t.title, weekNumber: t.weekNumber, blurb: t.blurb })
        .where(eq(topicsTable.id, found.id));
      await db
        .update(lecturesTable)
        .set({ title: t.lectureTitle, body: t.body, weekNumber: t.weekNumber })
        .where(eq(lecturesTable.topicId, found.id));
      updated += 1;
      continue;
    }
    const [inserted] = await db
      .insert(topicsTable)
      .values({
        slug: t.slug,
        title: t.title,
        weekNumber: t.weekNumber,
        blurb: t.blurb,
        position: 900 + i,
      })
      .returning();
    if (!inserted) throw new Error(`Failed to insert primer ${t.slug}`);
    await db.insert(lecturesTable).values({
      topicId: inserted.id,
      weekNumber: t.weekNumber,
      title: t.lectureTitle,
      body: t.body,
    });
    added += 1;
  }
  logger.info({ added, updated, removed }, "Reasoning primers reconciled");
}

export async function seedIfEmpty(): Promise<void> {
  // The course was migrated to the Constructive Critical Reasoning syllabus. Detect the marker topic;
  // if present and the content version matches, the content is current and we
  // skip. This makes the seed self-healing across environments: a database that
  // still holds older content (e.g. a previous curriculum) is detected and
  // replaced on boot.
  const markerTopic = await db
    .select({ id: topicsTable.id })
    .from(topicsTable)
    .where(eq(topicsTable.slug, MARKER_TOPIC_SLUG));
  // Read the stored content version. Tolerate the seed_meta table not yet
  // existing (e.g. a boot that races ahead of schema migration): treat that as
  // "no version recorded", which forces a reseed once the table is present.
  let currentVersion: string | null = null;
  try {
    const storedVersion = await db
      .select({ value: seedMetaTable.value })
      .from(seedMetaTable)
      .where(eq(seedMetaTable.key, "content_version"));
    currentVersion = storedVersion[0]?.value ?? null;
  } catch (err) {
    logger.warn({ err: (err as Error).message }, "Seed: seed_meta unavailable, treating version as unset");
    currentVersion = null;
  }
  if (markerTopic.length > 0 && currentVersion === SEED_CONTENT_VERSION) {
    logger.info("Seed: course content present and current, skipping");
    return;
  }
  if (markerTopic.length > 0) {
    logger.warn(
      { storedVersion: currentVersion, expected: SEED_CONTENT_VERSION },
      "Seed: course content present but out of date — re-seeding with the current curriculum",
    );
  }

  // No current content. Either the database is empty (fresh) or it still holds
  // an older curriculum. Do the (optional) wipe and the full reseed in a SINGLE
  // transaction so the marker topic only ever becomes visible once the entire
  // curriculum has committed. A crash mid-seed rolls back, so the next boot
  // retries instead of leaving partial content that the marker check would
  // wrongly treat as healthy. TRUNCATE also takes an ACCESS EXCLUSIVE lock, so
  // concurrent readers never observe a half-empty course during the replace
  // window. The diagnostic tables are truncated here too so the (non
  // version-gated) diagnostic seed repopulates them with the current content on
  // the same boot.
  await db.transaction(async (tx) => {
    const existing = await tx.execute(sql`select count(*)::int as n from topics`);
    const row = (existing.rows[0] ?? {}) as { n?: number };
    if ((row.n ?? 0) > 0) {
      logger.warn(
        "Seed: stale course content detected — replacing with the Constructive Critical Reasoning curriculum",
      );
      await tx.execute(
        sql`TRUNCATE TABLE answers, attempts, practice_attempts, practice_problems, practice_sessions, problems, assignments, lectures, topics, diagnostic_responses, diagnostic_attempts, diagnostic_items, diagnostic_assessments RESTART IDENTITY CASCADE`,
      );
    } else {
      logger.info("Seed: populating course content");
    }

    // Topics + lectures
    const slugToTopicId = new Map<string, number>();
    for (let i = 0; i < TOPICS.length; i++) {
      const t = TOPICS[i]!;
      const [inserted] = await tx
        .insert(topicsTable)
        .values({
          slug: t.slug,
          title: t.title,
          weekNumber: t.weekNumber,
          blurb: t.blurb,
          position: i,
        })
        .returning();
      if (!inserted) throw new Error(`Failed to insert topic ${t.slug}`);
      slugToTopicId.set(t.slug, inserted.id);
      await tx.insert(lecturesTable).values({
        topicId: inserted.id,
        weekNumber: t.weekNumber,
        title: t.lectureTitle,
        body: t.body,
      });
    }

    // Assignments + problems
    for (let i = 0; i < ASSIGNMENTS.length; i++) {
      const a = ASSIGNMENTS[i]!;
      const [inserted] = await tx
        .insert(assignmentsTable)
        .values({
          kind: a.kind,
          title: a.title,
          weekNumber: a.weekNumber,
          position: i,
          isTimed: a.isTimed,
          timeLimitMinutes: a.timeLimitMinutes,
          instructions: a.instructions,
        })
        .returning();
      if (!inserted) throw new Error(`Failed to insert assignment ${a.title}`);
      for (let p = 0; p < a.problems.length; p++) {
        const prob = a.problems[p]!;
        const topicId = slugToTopicId.get(prob.topicSlug);
        if (!topicId) throw new Error(`Unknown topic slug ${prob.topicSlug}`);
        await tx.insert(problemsTable).values({
          assignmentId: inserted.id,
          topicId,
          position: p,
          format: prob.format,
          itemType: prob.itemType,
          maxPoints: prob.maxPoints,
          prompt: prob.prompt,
          correctAnswer: prob.correctAnswer,
          explanation: prob.explanation,
          hint: prob.hint ?? null,
          mcOptions: prob.mcOptions ?? null,
          writtenRubric: prob.writtenRubric ?? null,
        });
      }
    }

    // Stamp the content version last, inside the same transaction, so the
    // marker check on the next boot only treats the course as "current" once
    // the entire curriculum has committed.
    await tx
      .insert(seedMetaTable)
      .values({ key: "content_version", value: SEED_CONTENT_VERSION })
      .onConflictDoUpdate({
        target: seedMetaTable.key,
        set: { value: SEED_CONTENT_VERSION, updatedAt: new Date() },
      });
  });

  logger.info(
    { topics: TOPICS.length, assignments: ASSIGNMENTS.length, version: SEED_CONTENT_VERSION },
    "Seed complete",
  );
}
