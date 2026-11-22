import { describe, expect, it } from 'vitest';
import { formatAmount, nextReminder, parseAmount, recommendedGoalMl, reminderTimes } from './hydration';

describe('recommendedGoalMl', () => {
  it('uses weight, gender and activity', () => {
    expect(recommendedGoalMl(70, 'male', 'low')).toBe(2450);
    expect(recommendedGoalMl(60, 'female', 'moderate')).toBe(2200); // 1860 + 350 = 2210 -> 2200
    expect(recommendedGoalMl(80, 'male', 'high')).toBe(3500);
  });
  it('stays between 1 and 5 litres', () => {
    expect(recommendedGoalMl(10, 'female', 'low')).toBe(1000);
    expect(recommendedGoalMl(200, 'male', 'high')).toBe(5000);
  });
});

describe('formatAmount / parseAmount', () => {
  it('formats ml and oz', () => {
    expect(formatAmount(250, 'ml')).toBe('250 ml');
    expect(formatAmount(250, 'oz')).toBe('8.5 fl oz');
    expect(formatAmount(ML_8OZ(), 'oz', false)).toBe('8');
  });
  it('parses typed amounts', () => {
    expect(parseAmount('300', 'ml')).toBe(300);
    expect(parseAmount('8', 'oz')).toBe(237);
    expect(parseAmount('2,5', 'oz')).toBe(74);
    expect(parseAmount('0', 'ml')).toBeNull();
    expect(parseAmount('abc', 'ml')).toBeNull();
    expect(parseAmount('9000', 'ml')).toBeNull();
  });
});
const ML_8OZ = () => 8 * 29.5735;

describe('reminderTimes', () => {
  it('runs from wake-up until bedtime', () => {
    expect(reminderTimes(7 * 60, 10 * 60, 60)).toEqual([420, 480, 540]);
  });
  it('handles bedtime after midnight', () => {
    expect(reminderTimes(22 * 60, 60, 60)).toEqual([0, 1320, 1380]);
  });
  it('caps the count', () => {
    expect(reminderTimes(0, 0, 15)).toHaveLength(48);
    expect(reminderTimes(0, 60, 0)).toEqual([]);
  });
});

describe('nextReminder', () => {
  it('finds the next time or wraps to tomorrow', () => {
    expect(nextReminder([420, 480], 450)).toBe(480);
    expect(nextReminder([420, 480], 500)).toBe(420);
    expect(nextReminder([], 500)).toBeNull();
  });
});
