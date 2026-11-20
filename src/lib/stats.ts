import type { Dismissal, MatchInput } from '../types';
import { DISMISSALS } from '../types';

type Innings = Pick<MatchInput, 'date' | 'runs' | 'balls' | 'fours' | 'sixes' | 'isOut' | 'dismissal'>;

export interface Summary {
  matches: number;
  outs: number;
  notOuts: number;
  totalRuns: number;
  totalBalls: number;
  totalFours: number;
  totalSixes: number;
  /** Runs per dismissal. null when never out (cricket shows this as "-"). */
  battingAverage: number | null;
  /** Runs per match played. null when no matches. */
  runsPerMatch: number | null;
  /** Runs per 100 balls. null when no balls faced. */
  strikeRate: number | null;
  highestScore: { runs: number; notOut: boolean } | null;
  fifties: number;
  hundreds: number;
  ducks: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function computeSummary(matches: Innings[]): Summary {
  let outs = 0;
  let totalRuns = 0;
  let totalBalls = 0;
  let totalFours = 0;
  let totalSixes = 0;
  let fifties = 0;
  let hundreds = 0;
  let ducks = 0;
  let highestScore: Summary['highestScore'] = null;

  for (const m of matches) {
    totalRuns += m.runs;
    totalBalls += m.balls;
    totalFours += m.fours;
    totalSixes += m.sixes;
    if (m.isOut) outs++;
    if (m.runs >= 100) hundreds++;
    else if (m.runs >= 50) fifties++;
    if (m.runs === 0 && m.isOut) ducks++;

    // Higher score wins; on a tie, a not-out score ranks above an out one.
    if (
      !highestScore ||
      m.runs > highestScore.runs ||
      (m.runs === highestScore.runs && !m.isOut && !highestScore.notOut)
    ) {
      highestScore = { runs: m.runs, notOut: !m.isOut };
    }
  }

  const count = matches.length;
  return {
    matches: count,
    outs,
    notOuts: count - outs,
    totalRuns,
    totalBalls,
    totalFours,
    totalSixes,
    battingAverage: outs > 0 ? round2(totalRuns / outs) : null,
    runsPerMatch: count > 0 ? round2(totalRuns / count) : null,
    strikeRate: totalBalls > 0 ? round2((totalRuns / totalBalls) * 100) : null,
    highestScore,
    fifties,
    hundreds,
    ducks,
  };
}

export interface DismissalCount {
  type: Dismissal;
  count: number;
  /** Share of all dismissals, 0-100. */
  percent: number;
}

/** How you got out, most common first. Types with zero count are omitted. */
export function dismissalBreakdown(matches: Innings[]): DismissalCount[] {
  const counts = new Map<Dismissal, number>();
  let total = 0;
  for (const m of matches) {
    if (!m.isOut || !m.dismissal) continue;
    counts.set(m.dismissal, (counts.get(m.dismissal) ?? 0) + 1);
    total++;
  }
  return DISMISSALS.filter((d) => counts.has(d))
    .map((type) => {
      const count = counts.get(type)!;
      return { type, count, percent: round2((count / total) * 100) };
    })
    .sort((a, b) => b.count - a.count);
}

/** The last `n` innings by date, oldest first (ready for a left-to-right chart). */
export function recentForm<T extends Innings>(matches: T[], n = 10): T[] {
  return [...matches].sort((a, b) => a.date.localeCompare(b.date)).slice(-n);
}

export function formatStat(value: number | null, digits = 2): string {
  return value === null ? '-' : value.toFixed(digits);
}
