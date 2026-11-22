import { describe, expect, it } from 'vitest';
import { currentStreak, lastNDays, summarize } from './stats';
import { shiftDay } from './time';

describe('shiftDay', () => {
  it('crosses month and year boundaries', () => {
    expect(shiftDay('2026-03-01', -1)).toBe('2026-02-28');
    expect(shiftDay('2026-12-31', 1)).toBe('2027-01-01');
  });
});

describe('lastNDays', () => {
  it('fills missing days with zero, oldest first', () => {
    expect(lastNDays([{ day: '2026-11-21', totalMl: 500 }], '2026-11-22', 3)).toEqual([
      { day: '2026-11-20', totalMl: 0 },
      { day: '2026-11-21', totalMl: 500 },
      { day: '2026-11-22', totalMl: 0 },
    ]);
  });
});

describe('currentStreak', () => {
  const totals = [
    { day: '2026-11-19', totalMl: 2000 },
    { day: '2026-11-20', totalMl: 2100 },
    { day: '2026-11-21', totalMl: 2000 },
    { day: '2026-11-22', totalMl: 300 },
  ];
  it('counts up to yesterday while today is in progress', () => {
    expect(currentStreak(totals, '2026-11-22', 2000)).toBe(3);
  });
  it('includes today once met', () => {
    expect(currentStreak(totals, '2026-11-22', 300)).toBe(4);
  });
  it('is zero after a missed day', () => {
    expect(currentStreak(totals, '2026-11-24', 2000)).toBe(0);
  });
});

describe('summarize', () => {
  it('averages only days with drinks', () => {
    const days = [
      { day: 'a', totalMl: 0 },
      { day: 'b', totalMl: 1000 },
      { day: 'c', totalMl: 2000 },
    ];
    expect(summarize(days, 2000)).toEqual({ averageMl: 1500, daysMet: 1, bestMl: 2000 });
  });
});
