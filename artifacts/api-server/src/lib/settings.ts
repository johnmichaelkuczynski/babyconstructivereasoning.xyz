// Operator-tunable course settings live in a single row (id = 1). These control
// how much each answer format is worth in the course rollup and how many
// diagnostic sets a student must complete. The row is created on first read so
// callers never have to special-case "no settings yet".
import { db, courseSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

export interface CourseSettings {
  formatWeightMcq: number;
  formatWeightHybrid: number;
  formatWeightWritten: number;
  minDiagnostics: number;
}

const DEFAULTS: CourseSettings = {
  formatWeightMcq: 1,
  formatWeightHybrid: 1,
  formatWeightWritten: 1,
  minDiagnostics: 4,
};

function toSettings(row: typeof courseSettingsTable.$inferSelect): CourseSettings {
  return {
    formatWeightMcq: row.formatWeightMcq,
    formatWeightHybrid: row.formatWeightHybrid,
    formatWeightWritten: row.formatWeightWritten,
    minDiagnostics: row.minDiagnostics,
  };
}

export async function getCourseSettings(): Promise<CourseSettings> {
  const [row] = await db
    .select()
    .from(courseSettingsTable)
    .where(eq(courseSettingsTable.id, 1));
  if (row) return toSettings(row);
  await db.insert(courseSettingsTable).values({ id: 1 }).onConflictDoNothing();
  const [created] = await db
    .select()
    .from(courseSettingsTable)
    .where(eq(courseSettingsTable.id, 1));
  return created ? toSettings(created) : { ...DEFAULTS };
}

export async function updateCourseSettings(patch: {
  formatWeightMcq?: number | null;
  formatWeightHybrid?: number | null;
  formatWeightWritten?: number | null;
  minDiagnostics?: number | null;
}): Promise<CourseSettings> {
  await getCourseSettings(); // ensure the row exists
  const set: Partial<CourseSettings> = {};
  if (patch.formatWeightMcq != null) set.formatWeightMcq = patch.formatWeightMcq;
  if (patch.formatWeightHybrid != null) set.formatWeightHybrid = patch.formatWeightHybrid;
  if (patch.formatWeightWritten != null) set.formatWeightWritten = patch.formatWeightWritten;
  if (patch.minDiagnostics != null) set.minDiagnostics = Math.max(0, Math.round(patch.minDiagnostics));
  if (Object.keys(set).length > 0) {
    await db.update(courseSettingsTable).set(set).where(eq(courseSettingsTable.id, 1));
  }
  return getCourseSettings();
}
