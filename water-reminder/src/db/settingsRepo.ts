import type { SQLiteDatabase } from 'expo-sqlite';
import type { Settings } from '../types';

export const DEFAULT_SETTINGS: Settings = {
  onboarded: false,
  gender: 'male',
  weightKg: 70,
  activity: 'moderate',
  goalMl: 2800,
  unit: 'ml',
  cupMl: 250,
  remindersOn: true,
  intervalMin: 60,
  wakeMin: 7 * 60,
  sleepMin: 22 * 60 + 30,
  lastHandledAction: '',
};

/** Settings are stored one row per key as JSON, so new settings fall back to their defaults. */
export async function loadSettings(db: SQLiteDatabase): Promise<Settings> {
  const rows = await db.getAllAsync<{ key: string; value: string }>('SELECT key, value FROM settings');
  const stored: Record<string, unknown> = {};
  for (const r of rows) {
    try {
      stored[r.key] = JSON.parse(r.value);
    } catch {
      // Ignore a corrupt value; the default is used instead.
    }
  }
  const result = { ...DEFAULT_SETTINGS };
  for (const key of Object.keys(DEFAULT_SETTINGS) as (keyof Settings)[]) {
    if (typeof stored[key] === typeof DEFAULT_SETTINGS[key]) (result as Record<string, unknown>)[key] = stored[key];
  }
  return result;
}

export async function saveSettings(db: SQLiteDatabase, patch: Partial<Settings>): Promise<void> {
  await db.withTransactionAsync(async () => {
    for (const [key, value] of Object.entries(patch)) {
      await db.runAsync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, JSON.stringify(value)]);
    }
  });
}

export async function resetSettings(db: SQLiteDatabase): Promise<void> {
  await db.runAsync('DELETE FROM settings');
}
