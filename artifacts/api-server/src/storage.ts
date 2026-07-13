/**
 * User + login-visit persistence backing the Google OAuth login system
 * (see ./auth.ts). This is the only place login users are read or written.
 */
import { db, usersTable, loginVisitsTable } from "@workspace/db";
import { eq, desc, gte } from "drizzle-orm";

export type AuthUser = typeof usersTable.$inferSelect;

export const storage = {
  async getUserById(id: number): Promise<AuthUser | undefined> {
    const rows = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    return rows[0];
  },

  async getUserByGoogleId(googleId: string): Promise<AuthUser | undefined> {
    const rows = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.googleId, googleId))
      .limit(1);
    return rows[0];
  },

  async getUserByEmail(email: string): Promise<AuthUser | undefined> {
    const rows = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    return rows[0];
  },

  async createUserWithGoogle(data: {
    username: string;
    googleId: string;
    email: string | null;
    displayName: string | null;
  }): Promise<AuthUser> {
    const rows = await db.insert(usersTable).values(data).returning();
    return rows[0];
  },

  async updateUserGoogle(
    id: number,
    patch: { googleId?: string; displayName?: string | null },
  ): Promise<AuthUser> {
    const rows = await db
      .update(usersTable)
      .set(patch)
      .where(eq(usersTable.id, id))
      .returning();
    return rows[0];
  },

  async recordVisit(userId: number, email: string | null): Promise<void> {
    await db.insert(loginVisitsTable).values({ userId, email });
  },

  async getVisits(limit: number) {
    return db
      .select()
      .from(loginVisitsTable)
      .orderBy(desc(loginVisitsTable.visitedAt))
      .limit(limit);
  },

  async getVisitTimestampsSince(since: Date | null): Promise<Date[]> {
    const rows = since
      ? await db
          .select({ visitedAt: loginVisitsTable.visitedAt })
          .from(loginVisitsTable)
          .where(gte(loginVisitsTable.visitedAt, since))
      : await db
          .select({ visitedAt: loginVisitsTable.visitedAt })
          .from(loginVisitsTable);
    return rows.map((r) => r.visitedAt);
  },
};
