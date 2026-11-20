export const DISMISSALS = [
  'bowled',
  'caught',
  'lbw',
  'run_out',
  'stumped',
  'hit_wicket',
  'retired',
  'other',
] as const;

export type Dismissal = (typeof DISMISSALS)[number];

export const DISMISSAL_LABELS: Record<Dismissal, string> = {
  bowled: 'Bowled',
  caught: 'Caught',
  lbw: 'LBW',
  run_out: 'Run out',
  stumped: 'Stumped',
  hit_wicket: 'Hit wicket',
  retired: 'Retired out',
  other: 'Other',
};

export const FORMATS = ['T20', 'ODI', 'Test', 'Tape-ball', 'Box', 'Other'] as const;

/** One batting innings. */
export interface Match {
  id: number;
  /** ISO date, YYYY-MM-DD */
  date: string;
  opponent: string;
  venue: string;
  format: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  isOut: boolean;
  /** Set only when isOut is true. */
  dismissal: Dismissal | null;
  notes: string;
  createdAt: string;
}

export type MatchInput = Omit<Match, 'id' | 'createdAt'>;
