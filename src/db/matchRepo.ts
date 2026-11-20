import type { SQLiteDatabase } from 'expo-sqlite';
import type { Dismissal, Match, MatchInput } from '../types';

interface MatchRow {
  id: number;
  date: string;
  opponent: string;
  venue: string;
  format: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  is_out: number;
  dismissal: string | null;
  notes: string;
  created_at: string;
}

function fromRow(r: MatchRow): Match {
  return {
    id: r.id,
    date: r.date,
    opponent: r.opponent,
    venue: r.venue,
    format: r.format,
    runs: r.runs,
    balls: r.balls,
    fours: r.fours,
    sixes: r.sixes,
    isOut: r.is_out === 1,
    dismissal: r.is_out === 1 ? (r.dismissal as Dismissal | null) : null,
    notes: r.notes,
    createdAt: r.created_at,
  };
}

function params(m: MatchInput) {
  return [
    m.date,
    m.opponent.trim(),
    m.venue.trim(),
    m.format,
    m.runs,
    m.balls,
    m.fours,
    m.sixes,
    m.isOut ? 1 : 0,
    m.isOut ? m.dismissal : null,
    m.notes.trim(),
  ];
}

/** All matches, newest first. */
export async function listMatches(db: SQLiteDatabase): Promise<Match[]> {
  const rows = await db.getAllAsync<MatchRow>('SELECT * FROM matches ORDER BY date DESC, id DESC');
  return rows.map(fromRow);
}

export async function getMatch(db: SQLiteDatabase, id: number): Promise<Match | null> {
  const row = await db.getFirstAsync<MatchRow>('SELECT * FROM matches WHERE id = ?', id);
  return row ? fromRow(row) : null;
}

export async function insertMatch(db: SQLiteDatabase, m: MatchInput): Promise<number> {
  const res = await db.runAsync(
    `INSERT INTO matches (date, opponent, venue, format, runs, balls, fours, sixes, is_out, dismissal, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    params(m),
  );
  return res.lastInsertRowId;
}

export async function updateMatch(db: SQLiteDatabase, id: number, m: MatchInput): Promise<void> {
  await db.runAsync(
    `UPDATE matches SET date = ?, opponent = ?, venue = ?, format = ?, runs = ?, balls = ?,
       fours = ?, sixes = ?, is_out = ?, dismissal = ?, notes = ?
     WHERE id = ?`,
    [...params(m), id],
  );
}

export async function deleteMatch(db: SQLiteDatabase, id: number): Promise<void> {
  await db.runAsync('DELETE FROM matches WHERE id = ?', id);
}

/** Inserts many matches in one transaction. With `replace`, existing matches are deleted first. */
export async function importMatches(
  db: SQLiteDatabase,
  matches: MatchInput[],
  replace: boolean,
): Promise<void> {
  await db.withTransactionAsync(async () => {
    if (replace) await db.runAsync('DELETE FROM matches');
    for (const m of matches) await insertMatch(db, m);
  });
}

export async function deleteAllMatches(db: SQLiteDatabase): Promise<void> {
  await db.runAsync('DELETE FROM matches');
}
