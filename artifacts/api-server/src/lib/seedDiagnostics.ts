import { sql } from "drizzle-orm";
import {
  db,
  diagnosticAssessmentsTable,
  diagnosticItemsTable,
} from "@workspace/db";
import { logger } from "./logger";
import { DIAGNOSTIC_SEED } from "./diagnosticContent";

// Rotate an options array by a random offset so the (originally-first) correct
// option lands at a random index, returning the new array plus the new correct
// index. This keeps authoring simple (write the correct option first) while
// avoiding both an "always A" pattern and any deterministic coupling between an
// item's public `position` and its hidden correct index.
function rotateOptions(options: string[]): {
  options: string[];
  correctIndex: number;
} {
  const n = options.length;
  const off = Math.floor(Math.random() * n);
  const rotated = new Array<string>(n);
  for (let k = 0; k < n; k++) {
    rotated[(k + off) % n] = options[k]!;
  }
  return { options: rotated, correctIndex: off };
}

export async function seedDiagnosticsIfEmpty(): Promise<void> {
  const existing = await db.execute(
    sql`select count(*)::int as n from diagnostic_assessments`,
  );
  const row = (existing.rows[0] ?? {}) as { n?: number };
  if ((row.n ?? 0) > 0) {
    logger.info("Diagnostic seed: already populated, skipping");
    return;
  }
  logger.info("Diagnostic seed: populating reasoning assessments");

  let itemTotal = 0;
  for (let i = 0; i < DIAGNOSTIC_SEED.length; i++) {
    const a = DIAGNOSTIC_SEED[i]!;
    const [inserted] = await db
      .insert(diagnosticAssessmentsTable)
      .values({
        instrument: a.instrument,
        phase: a.phase,
        title: a.title,
        subtitle: a.subtitle,
        instructions: a.instructions,
        position: i,
      })
      .returning();
    if (!inserted) throw new Error(`Failed to insert assessment ${a.title}`);

    let pos = 0;
    for (const d of a.dilemmas ?? []) {
      await db.insert(diagnosticItemsTable).values({
        assessmentId: inserted.id,
        position: pos,
        type: "dilemma",
        prompt: d.prompt,
        payload: {
          decisionOptions: d.decisionOptions,
          considerations: d.considerations.map((c) => c.text),
          rankCount: d.rankCount,
        },
        scoring: {
          stages: d.considerations.map((c) => c.stage),
          rankCount: d.rankCount,
        },
      });
      pos += 1;
      itemTotal += 1;
    }

    for (const m of a.mcqs ?? []) {
      const { options, correctIndex } = rotateOptions(m.options);
      await db.insert(diagnosticItemsTable).values({
        assessmentId: inserted.id,
        position: pos,
        type: "mcq",
        prompt: m.prompt,
        payload: { options },
        scoring: { correctIndex, skillArea: m.skillArea },
      });
      pos += 1;
      itemTotal += 1;
    }
  }

  logger.info(
    { assessments: DIAGNOSTIC_SEED.length, items: itemTotal },
    "Diagnostic seed complete",
  );
}
