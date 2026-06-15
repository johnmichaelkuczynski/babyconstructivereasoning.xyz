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

// Small stable hash of a string, used as a content marker so a change to the
// seeded prompts/instructions (not just the instrument/phase set) triggers a
// self-healing reseed.
function contentHash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
}

// The per-assessment content fingerprint: its instructions plus the ordered
// prompts. Options are rotated at seed time so they are intentionally excluded;
// prompts and instructions are stored verbatim and capture the content edits we
// care about.
function assessmentContent(
  instrument: string,
  phase: string,
  instructions: string,
  prompts: string[],
): string {
  return `${instrument}:${phase}\n${instructions}\n${prompts.join("\n")}`;
}

// Signature of the desired seed: the sorted set of "instrument:phase" keys plus
// a hash of the seeded content (instructions + prompts), so editing any prompt
// re-triggers seeding even though the instrument/phase set is unchanged.
function desiredSignature(): string {
  const keys = DIAGNOSTIC_SEED.map((a) => `${a.instrument}:${a.phase}`)
    .sort()
    .join("|");
  const content = DIAGNOSTIC_SEED.map((a) =>
    assessmentContent(
      a.instrument,
      a.phase,
      a.instructions,
      a.mcqs.map((m) => m.prompt),
    ),
  )
    .sort()
    .join("\n---\n");
  return `${keys}::${contentHash(content)}`;
}

async function existingSignature(): Promise<string> {
  const res = await db.execute(
    sql`select a.id, a.instrument, a.phase, a.instructions, i.prompt, i.position
        from diagnostic_assessments a
        left join diagnostic_items i
          on i.assessment_id = a.id and i.attempt_id is null
        order by a.id, i.position`,
  );
  const rows = res.rows as {
    id?: number;
    instrument?: string;
    phase?: string;
    instructions?: string;
    prompt?: string | null;
    position?: number | null;
  }[];
  if (rows.length === 0) return "";
  const byAssessment = new Map<
    number,
    { instrument: string; phase: string; instructions: string; prompts: string[] }
  >();
  for (const r of rows) {
    const id = r.id!;
    let entry = byAssessment.get(id);
    if (!entry) {
      entry = {
        instrument: r.instrument ?? "",
        phase: r.phase ?? "",
        instructions: r.instructions ?? "",
        prompts: [],
      };
      byAssessment.set(id, entry);
    }
    if (typeof r.prompt === "string") entry.prompts.push(r.prompt);
  }
  const entries = [...byAssessment.values()];
  const keys = entries
    .map((e) => `${e.instrument}:${e.phase}`)
    .sort()
    .join("|");
  const content = entries
    .map((e) =>
      assessmentContent(e.instrument, e.phase, e.instructions, e.prompts),
    )
    .sort()
    .join("\n---\n");
  return `${keys}::${contentHash(content)}`;
}

async function insertSeed(): Promise<void> {
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
    for (const m of a.mcqs) {
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

// Seed the diagnostic assessments, self-healing if the stored set no longer
// matches the desired (instrument, phase) signature — e.g. after the subsystem
// was redefined. Replacing them cascades to items, attempts, and responses, so
// only run a replace when the signature actually differs.
export async function seedDiagnosticsIfEmpty(): Promise<void> {
  const desired = desiredSignature();
  const existing = await existingSignature();

  if (existing === desired) {
    logger.info("Diagnostic seed: up to date, skipping");
    return;
  }

  if (existing.length > 0) {
    logger.info(
      "Diagnostic seed: signature changed, replacing diagnostic assessments",
    );
    // Delete cascades to items/attempts/responses via FK constraints.
    await db.delete(diagnosticAssessmentsTable);
  } else {
    logger.info("Diagnostic seed: populating reasoning assessments");
  }

  await insertSeed();
}
