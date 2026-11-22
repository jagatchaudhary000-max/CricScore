import { Text, View } from 'react-native';
import { Chip, ChipRow, Stepper } from './ui';
import { formatClock, formatDuration } from '../lib/time';
import { colors, spacing } from '../theme';

export const INTERVALS = [30, 45, 60, 90, 120, 180];
const STEP = 15;

export interface Schedule {
  wakeMin: number;
  sleepMin: number;
  intervalMin: number;
}

const wrap = (m: number) => (m + 1440) % 1440;

export function ScheduleForm({ value, onChange }: { value: Schedule; onChange: (s: Schedule) => void }) {
  const set = (patch: Partial<Schedule>) => onChange({ ...value, ...patch });
  return (
    <View style={{ gap: spacing.sm }}>
      <Stepper
        label="☀️ Wake-up"
        value={formatClock(value.wakeMin)}
        onMinus={() => set({ wakeMin: wrap(value.wakeMin - STEP) })}
        onPlus={() => set({ wakeMin: wrap(value.wakeMin + STEP) })}
      />
      <Stepper
        label="🌙 Bedtime"
        value={formatClock(value.sleepMin)}
        onMinus={() => set({ sleepMin: wrap(value.sleepMin - STEP) })}
        onPlus={() => set({ sleepMin: wrap(value.sleepMin + STEP) })}
      />
      <Text style={{ fontSize: 14, fontWeight: '600', color: colors.muted, marginTop: spacing.sm }}>Remind me every</Text>
      <ChipRow>
        {INTERVALS.map((m) => (
          <Chip key={m} label={formatDuration(m)} selected={value.intervalMin === m} onPress={() => set({ intervalMin: m })} />
        ))}
      </ChipRow>
    </View>
  );
}
