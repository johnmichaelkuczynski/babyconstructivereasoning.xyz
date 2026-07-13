import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";

// Google-login user accounts.
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  googleId: text("google_id").unique(),
  email: text("email").unique(),
  displayName: text("display_name"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// One row per successful Google sign-in (admin visitor analytics).
export const loginVisitsTable = pgTable("login_visits", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  email: text("email"),
  visitedAt: timestamp("visited_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
