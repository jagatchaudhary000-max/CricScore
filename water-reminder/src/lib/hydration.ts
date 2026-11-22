import type { Activity, Gender, Minutes, Unit } from '../types';

export const ML_PER_OZ = 29.5735;
export const MIN_GOAL_ML = 1000;
export const MAX_GOAL_ML = 5000;

const ML_PER_KG: Record<Gender, number> = { male: 35, female: 31 };
const ACTIVITY_EXTRA_ML: Record<Activity, number> = { low: 0, moderate: 350, high: 700 };

/**
 * Recommended daily water goal: body weight x 35 ml (men) or 31 ml (women), plus extra for exercise,
 * rounded to the nearest 50 ml and kept between 1 and 5 litres. A guide only, not medical advice.
 */
export function recommendedGoalMl(weightKg: number, gender: Gender, activity: Activity): number {
  const raw = weightKg * ML_PER_KG[gender] + ACTIVITY_EXTRA_ML[activity];
  return clampGoal(Math.round(raw / 50) * 50);
}

export function clampGoal(ml: number): number {
  return Math.min(MAX_GOAL_ML, Math.max(MIN_GOAL_ML, Math.round(ml)));
}

/** Amount in the user's unit, e.g. "250 ml" or "8.5 fl oz". */
export function formatAmount(ml: number, unit: Unit, withUnit = true): string {
  const value = unit === 'ml' ? String(Math.round(ml)) : formatOz(ml / ML_PER_OZ);
  return withUnit ? `${value} ${unit === 'ml' ? 'ml' : 'fl oz'}` : value;
}

function formatOz(oz: number): string {
  const r = Math.round(oz * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
}

/** Parses a number typed in the user's unit and returns ml, or null if it is not a sensible amount. */
export function parseAmount(text: string, unit: Unit): number | null {
  const n = Number(text.replace(',', '.').trim());
  if (!Number.isFinite(n) || n <= 0) return null;
  const ml = Math.round(unit === 'ml' ? n : n * ML_PER_OZ);
  return ml >= 10 && ml <= 3000 ? ml : null;
}

/**
 * Times of day for reminders: from wake-up, every `intervalMin`, until (not including) bedtime.
 * Bedtime after midnight (e.g. wake 07:00, sleep 01:00) is handled. Returned sorted, as minutes of day.
 */
export function reminderTimes(wakeMin: Minutes, sleepMin: Minutes, intervalMin: number): Minutes[] {
  if (intervalMin <= 0) return [];
  const end = sleepMin > wakeMin ? sleepMin : sleepMin + 1440;
  const times: Minutes[] = [];
  for (let t = wakeMin; t < end && times.length < 48; t += intervalMin) times.push(t % 1440);
  return times.sort((a, b) => a - b);
}

/** The next reminder after `nowMin`, wrapping to tomorrow's first one. Null if there are none. */
export function nextReminder(times: Minutes[], nowMin: Minutes): Minutes | null {
  if (times.length === 0) return null;
  return times.find((t) => t > nowMin) ?? times[0];
}
