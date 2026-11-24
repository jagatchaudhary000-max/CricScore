import type { Match, MatchInput } from '../types';
import { parseMatchInput } from './validation';

export const BACKUP_APP_ID = 'cricscore';
export const BACKUP_VERSION = 1;

export function buildBackup(matches: Match[], now = new Date()): string {
  return JSON.stringify(
    {
      app: BACKUP_APP_ID,
      version: BACKUP_VERSION,
      exportedAt: now.toISOString(),
      matches: matches.map(({ id: _id, createdAt: _c, ...rest }) => rest),
    },
    null,
    2,
  );
}

export interface ParsedBackup {
  matches: MatchInput[];
  skipped: number;
}

/** Parses a backup file. Throws with a user-readable message if it isn't a 11 Wolves backup. */
export function parseBackup(text: string): ParsedBackup {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('This file is not valid JSON.');
  }
  const d = data as { app?: unknown; matches?: unknown };
  if (typeof d !== 'object' || d === null || d.app !== BACKUP_APP_ID || !Array.isArray(d.matches)) {
    throw new Error('This is not a 11 Wolves backup file.');
  }
  const matches: MatchInput[] = [];
  let skipped = 0;
  for (const raw of d.matches) {
    const m = parseMatchInput(raw);
    if (m) matches.push(m);
    else skipped++;
  }
  return { matches, skipped };
}
