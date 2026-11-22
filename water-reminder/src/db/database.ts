import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'water.db';

const LATEST_VERSION = 1;

/** Runs once on app start (via SQLiteProvider's onInit). Applies schema migrations in order. */
export async function migrateDatabase(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let version = row?.user_version ?? 0;
  if (version >= LATEST_VERSION) return;

  if (version === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS intake (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        amount_ml  INTEGER NOT NULL CHECK (amount_ml > 0),
        day        TEXT    NOT NULL,
        minute     INTEGER NOT NULL,
        created_at TEXT    NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_intake_day ON intake(day);
      CREATE TABLE IF NOT EXISTS settings (
        key   TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL
      );
    `);
    version = 1;
  }

  // Future schema changes go here as `if (version === 1) { ...; version = 2; }`.

  await db.execAsync(`PRAGMA user_version = ${LATEST_VERSION}`);
}
