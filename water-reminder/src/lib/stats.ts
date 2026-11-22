import type { DayTotal } from '../types';
import { shiftDay } from './time';

/** Totals for the `count` days ending on `today` (oldest first), filling missing days with 0. */
export function lastNDays(totals: DayTotal[], today: string, count: number): DayTotal[] {
  const byDay = new Map(totals.map((t) => [t.day, t.totalMl]));
  return Array.from({ length: count }, (_, i) => {
    const day = shiftDay(today, i - count + 1);
    return { day, totalMl: byDay.get(day) ?? 0 };
  });
}

/**
 * Consecutive days the goal was met, ending today. If today's goal is not met yet the streak
 * still counts up to yesterday, so it does not reset first thing in the morning.
 */
export function currentStreak(totals: DayTotal[], today: string, goalMl: number): number {
  const met = new Set(totals.filter((t) => t.totalMl >= goalMl).map((t) => t.day));
  let day = met.has(today) ? today : shiftDay(today, -1);
  let streak = 0;
  while (met.has(day)) {
    streak++;
    day = shiftDay(day, -1);
  }
  return streak;
}

export function summarize(days: DayTotal[], goalMl: number) {
  const logged = days.filter((d) => d.totalMl > 0);
  const total = logged.reduce((s, d) => s + d.totalMl, 0);
  return {
    averageMl: logged.length ? Math.round(total / logged.length) : 0,
    daysMet: days.filter((d) => d.totalMl >= goalMl).length,
    bestMl: Math.max(0, ...days.map((d) => d.totalMl)),
  };
}
