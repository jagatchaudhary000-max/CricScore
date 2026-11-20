import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'cricscore.db';

const LATEST_VERSION = 1;

/** Runs once on app start (via SQLiteProvider's onInit). Applies schema migrations in order. */
export async function migrateDatabase(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let version = row?.user_version ?? 0;
  if (version >= LATEST_VERSION) return;

  if (version === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS matches (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        date        TEXT    NOT NULL,
        opponent    TEXT    NOT NULL DEFAULT '',
        venue       TEXT    NOT NULL DEFAULT '',
        format      TEXT    NOT NULL DEFAULT '',
        runs        INTEGER NOT NULL CHECK (runs >= 0),
        balls       INTEGER NOT NULL CHECK (balls >= 0),
        fours       INTEGER NOT NULL DEFAULT 0,
        sixes       INTEGER NOT NULL DEFAULT 0,
        is_out      INTEGER NOT NULL,
        dismissal   TEXT,
        notes       TEXT    NOT NULL DEFAULT '',
        created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(date);
    `);
    version = 1;
  }

  // Future schema changes go here as `if (version === 1) { ...; version = 2; }`.

  await db.execAsync(`PRAGMA user_version = ${LATEST_VERSION}`);
}
