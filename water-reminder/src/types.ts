export type Gender = 'male' | 'female';
export type Activity = 'low' | 'moderate' | 'high';
export type Unit = 'ml' | 'oz';

/** Minutes after midnight, 0..1439. */
export type Minutes = number;

export interface Settings {
  onboarded: boolean;
  gender: Gender;
  weightKg: number;
  activity: Activity;
  /** Daily goal in ml. */
  goalMl: number;
  unit: Unit;
  /** Cup size used by the big "Drink" button and the notification action, in ml. */
  cupMl: number;
  remindersOn: boolean;
  intervalMin: number;
  wakeMin: Minutes;
  sleepMin: Minutes;
  /** Key of the last notification action that logged a drink, so it is never logged twice. */
  lastHandledAction: string;
}

export interface Intake {
  id: number;
  amountMl: number;
  /** Local date, YYYY-MM-DD. */
  day: string;
  /** Local time of day in minutes after midnight. */
  minute: Minutes;
}

export interface DayTotal {
  day: string;
  totalMl: number;
}
