import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

// user.db: everything the learner generates. The read-only content.db (words, kanji, strips)
// is a separate file built offline, so app updates never touch progress.

/** One FSRS card per studied item (word, kanji or kana). Columns mirror ts-fsrs's Card. */
export const cards = sqliteTable("cards", {
  id: text().primaryKey(), // content id, e.g. "word:1234" or "kanji:食"
  kind: text({ enum: ["word", "kanji", "kana"] }).notNull(),
  due: integer({ mode: "timestamp" }).notNull(),
  stability: real().notNull(),
  difficulty: real().notNull(),
  elapsedDays: integer().notNull(),
  scheduledDays: integer().notNull(),
  learningSteps: integer().notNull(),
  reps: integer().notNull(),
  lapses: integer().notNull(),
  state: integer().notNull(),
  lastReview: integer({ mode: "timestamp" }),
});

export const stripProgress = sqliteTable("strip_progress", {
  stripId: text().primaryKey(),
  score: integer().notNull(), // 0-100
  completedAt: integer({ mode: "timestamp" }).notNull(),
});

/** One row per day: drives the streak, calendar and stats screens. */
export const dailyActivity = sqliteTable("daily_activity", {
  day: text().primaryKey(), // YYYY-MM-DD, local time
  xp: integer().notNull().default(0),
  minutes: integer().notNull().default(0),
  correct: integer().notNull().default(0),
  answered: integer().notNull().default(0),
});
