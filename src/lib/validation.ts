import type { MatchInput } from '../types';
import { DISMISSALS } from '../types';

export type ValidationErrors = Partial<Record<keyof MatchInput, string>>;

const isInt = (n: unknown): n is number => typeof n === 'number' && Number.isInteger(n) && n >= 0;

export function isValidDate(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

export function validateMatch(m: MatchInput): ValidationErrors {
  const e: ValidationErrors = {};
  if (!isValidDate(m.date)) e.date = 'Use the format YYYY-MM-DD';
  if (!isInt(m.runs)) e.runs = 'Enter runs (0 or more)';
  if (!isInt(m.balls)) e.balls = 'Enter balls faced (0 or more)';
  if (!isInt(m.fours)) e.fours = 'Must be 0 or more';
  if (!isInt(m.sixes)) e.sixes = 'Must be 0 or more';
  if (isInt(m.runs) && isInt(m.balls) && m.runs > 0 && m.balls === 0) {
    e.balls = 'You scored runs, so balls faced must be at least 1';
  }
  if (isInt(m.runs) && isInt(m.fours) && isInt(m.sixes) && m.fours * 4 + m.sixes * 6 > m.runs) {
    e.fours = 'Boundaries add up to more than your runs';
  }
  if (m.isOut && (!m.dismissal || !DISMISSALS.includes(m.dismissal))) {
    e.dismissal = 'Choose how you got out';
  }
  return e;
}

/** Turns an untrusted object (e.g. from a backup file) into a MatchInput, or null if invalid. */
export function parseMatchInput(raw: unknown): MatchInput | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const r = raw as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === 'string' ? v : '');
  const isOut = r.isOut === true;
  const m: MatchInput = {
    date: str(r.date),
    opponent: str(r.opponent),
    venue: str(r.venue),
    format: str(r.format),
    runs: r.runs as number,
    balls: r.balls as number,
    fours: (r.fours ?? 0) as number,
    sixes: (r.sixes ?? 0) as number,
    isOut,
    dismissal: isOut ? (r.dismissal as MatchInput['dismissal']) : null,
    notes: str(r.notes),
  };
  return Object.keys(validateMatch(m)).length === 0 ? m : null;
}
