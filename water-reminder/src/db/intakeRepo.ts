import type { SQLiteDatabase } from 'expo-sqlite';
import type { DayTotal, Intake } from '../types';
import { dayKey, minuteOfDay } from '../lib/time';

interface IntakeRow {
  id: number;
  amount_ml: number;
  day: string;
  minute: number;
}

const fromRow = (r: IntakeRow): Intake => ({ id: r.id, amountMl: r.amount_ml, day: r.day, minute: r.minute });

export async function addIntake(db: SQLiteDatabase, amountMl: number, at = new Date()): Promise<void> {
  await db.runAsync('INSERT INTO intake (amount_ml, day, minute) VALUES (?, ?, ?)', [
    Math.round(amountMl),
    dayKey(at),
    minuteOfDay(at),
  ]);
}

export async function deleteIntake(db: SQLiteDatabase, id: number): Promise<void> {
  await db.runAsync('DELETE FROM intake WHERE id = ?', [id]);
}

export async function listDay(db: SQLiteDatabase, day: string): Promise<Intake[]> {
  const rows = await db.getAllAsync<IntakeRow>(
    'SELECT id, amount_ml, day, minute FROM intake WHERE day = ? ORDER BY minute DESC, id DESC',
    [day],
  );
  return rows.map(fromRow);
}

/** Daily totals for days on or after `fromDay`, oldest first. */
export async function dailyTotals(db: SQLiteDatabase, fromDay: string): Promise<DayTotal[]> {
  const rows = await db.getAllAsync<{ day: string; total: number }>(
    'SELECT day, SUM(amount_ml) AS total FROM intake WHERE day >= ? GROUP BY day ORDER BY day',
    [fromDay],
  );
  return rows.map((r) => ({ day: r.day, totalMl: r.total }));
}

export async function deleteAllIntake(db: SQLiteDatabase): Promise<void> {
  await db.runAsync('DELETE FROM intake');
}
