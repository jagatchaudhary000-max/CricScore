import type { Minutes } from '../types';

const pad = (n: number) => String(n).padStart(2, '0');

/** Local date as YYYY-MM-DD. */
export function dayKey(d = new Date()): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** The local day `offset` days from `from` (negative = past), as YYYY-MM-DD. */
export function shiftDay(from: string, offset: number): string {
  const [y, m, d] = from.split('-').map(Number);
  return dayKey(new Date(y, m - 1, d + offset));
}

export function minuteOfDay(d = new Date()): Minutes {
  return d.getHours() * 60 + d.getMinutes();
}

/** 450 -> "07:30" */
export function formatClock(min: Minutes): string {
  const m = ((min % 1440) + 1440) % 1440;
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
}

/** 90 -> "1 h 30 min", 45 -> "45 min" */
export function formatDuration(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function weekdayShort(day: string): string {
  const [y, m, d] = day.split('-').map(Number);
  return WEEKDAYS[new Date(y, m - 1, d).getDay()];
}

/** "2026-11-22" -> "Sun, 22 Nov" */
export function formatDay(day: string): string {
  const [, m, d] = day.split('-').map(Number);
  return `${weekdayShort(day)}, ${d} ${MONTHS[m - 1]}`;
}
