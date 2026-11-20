import { describe, expect, it } from 'vitest';
import { computeSummary, dismissalBreakdown, formatStat, recentForm } from './stats';
import type { MatchInput } from '../types';

const inn = (runs: number, balls: number, dismissal: MatchInput['dismissal'], date = '2026-01-01'): MatchInput => ({
  date,
  opponent: '',
  venue: '',
  format: '',
  runs,
  balls,
  fours: 0,
  sixes: 0,
  isOut: dismissal !== null,
  dismissal,
  notes: '',
});

describe('computeSummary', () => {
  it('handles no matches', () => {
    const s = computeSummary([]);
    expect(s.matches).toBe(0);
    expect(s.battingAverage).toBeNull();
    expect(s.runsPerMatch).toBeNull();
    expect(s.strikeRate).toBeNull();
    expect(s.highestScore).toBeNull();
  });

  it('computes cricket-style average (runs / dismissals) and runs per match', () => {
    const s = computeSummary([inn(40, 30, 'bowled'), inn(20, 10, null), inn(0, 2, 'lbw')]);
    expect(s.matches).toBe(3);
    expect(s.outs).toBe(2);
    expect(s.notOuts).toBe(1);
    expect(s.totalRuns).toBe(60);
    expect(s.totalBalls).toBe(42);
    expect(s.battingAverage).toBe(30);
    expect(s.runsPerMatch).toBe(20);
    expect(s.strikeRate).toBe(142.86);
    expect(s.ducks).toBe(1);
  });

  it('has no average when never out', () => {
    const s = computeSummary([inn(15, 10, null)]);
    expect(s.battingAverage).toBeNull();
    expect(formatStat(s.battingAverage)).toBe('-');
  });

  it('counts 50s and 100s separately and does not count a 0 not out as a duck', () => {
    const s = computeSummary([inn(50, 40, 'caught'), inn(99, 70, null), inn(100, 80, 'caught'), inn(0, 1, null)]);
    expect(s.fifties).toBe(2);
    expect(s.hundreds).toBe(1);
    expect(s.ducks).toBe(0);
  });

  it('prefers a not-out score when highest scores tie', () => {
    expect(computeSummary([inn(70, 50, 'caught'), inn(70, 45, null)]).highestScore).toEqual({ runs: 70, notOut: true });
    expect(computeSummary([inn(70, 45, null), inn(70, 50, 'caught')]).highestScore).toEqual({ runs: 70, notOut: true });
  });
});

describe('dismissalBreakdown', () => {
  it('counts each dismissal type, most common first, ignoring not outs', () => {
    const d = dismissalBreakdown([
      inn(1, 1, 'caught'),
      inn(2, 2, 'bowled'),
      inn(3, 3, 'caught'),
      inn(4, 4, 'caught'),
      inn(5, 5, null),
    ]);
    expect(d).toEqual([
      { type: 'caught', count: 3, percent: 75 },
      { type: 'bowled', count: 1, percent: 25 },
    ]);
  });
});

describe('recentForm', () => {
  it('returns the last n innings by date, oldest first', () => {
    const ms = [inn(1, 1, null, '2026-03-01'), inn(2, 1, null, '2026-01-01'), inn(3, 1, null, '2026-02-01')];
    expect(recentForm(ms, 2).map((m) => m.runs)).toEqual([3, 1]);
  });
});
