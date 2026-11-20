import { describe, expect, it } from 'vitest';
import { isValidDate, validateMatch } from './validation';
import { buildBackup, parseBackup } from './backup';
import type { Match, MatchInput } from '../types';

const base: MatchInput = {
  date: '2026-11-15',
  opponent: 'Street XI',
  venue: '',
  format: 'T20',
  runs: 34,
  balls: 28,
  fours: 3,
  sixes: 1,
  isOut: true,
  dismissal: 'caught',
  notes: '',
};

describe('validateMatch', () => {
  it('accepts a valid innings', () => {
    expect(validateMatch(base)).toEqual({});
  });

  it('requires a dismissal type when out', () => {
    expect(validateMatch({ ...base, dismissal: null }).dismissal).toBeDefined();
    expect(validateMatch({ ...base, isOut: false, dismissal: null })).toEqual({});
  });

  it('rejects runs without balls, bad numbers and too many boundaries', () => {
    expect(validateMatch({ ...base, balls: 0 }).balls).toBeDefined();
    expect(validateMatch({ ...base, runs: NaN }).runs).toBeDefined();
    expect(validateMatch({ ...base, runs: -1 }).runs).toBeDefined();
    expect(validateMatch({ ...base, fours: 10 }).fours).toBeDefined();
  });

  it('validates dates', () => {
    expect(isValidDate('2026-02-28')).toBe(true);
    expect(isValidDate('2026-02-30')).toBe(false);
    expect(isValidDate('15/11/2026')).toBe(false);
  });
});

describe('backup', () => {
  it('round-trips matches through export and import', () => {
    const match: Match = { ...base, id: 7, createdAt: '2026-11-15 10:00:00' };
    const { matches, skipped } = parseBackup(buildBackup([match]));
    expect(skipped).toBe(0);
    expect(matches).toEqual([base]);
  });

  it('skips invalid entries and rejects non-backup files', () => {
    const text = JSON.stringify({ app: 'cricscore', version: 1, matches: [base, { runs: 'x' }] });
    expect(parseBackup(text)).toEqual({ matches: [base], skipped: 1 });
    expect(() => parseBackup('{"foo":1}')).toThrow('not a Jagat Cricket backup');
    expect(() => parseBackup('nope')).toThrow('not valid JSON');
  });
});
