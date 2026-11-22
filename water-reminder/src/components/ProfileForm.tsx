import { Text, View } from 'react-native';
import type { Activity, Gender } from '../types';
import { Chip, ChipRow, Stepper } from './ui';
import { colors, spacing } from '../theme';

export interface Profile {
  gender: Gender;
  weightKg: number;
  activity: Activity;
}

const ACTIVITY_LABELS: Record<Activity, string> = {
  low: 'Light (mostly sitting)',
  moderate: 'Moderate (some exercise)',
  high: 'High (daily workouts)',
};

/** Gender, weight and activity: the inputs for the recommended daily goal. */
export function ProfileForm({ value, onChange }: { value: Profile; onChange: (p: Profile) => void }) {
  const set = (patch: Partial<Profile>) => onChange({ ...value, ...patch });
  const weight = (kg: number) => set({ weightKg: Math.min(200, Math.max(20, kg)) });
  return (
    <View style={{ gap: spacing.md }}>
      <Label>Gender</Label>
      <ChipRow>
        <Chip label="♂ Male" selected={value.gender === 'male'} onPress={() => set({ gender: 'male' })} />
        <Chip label="♀ Female" selected={value.gender === 'female'} onPress={() => set({ gender: 'female' })} />
      </ChipRow>
      <Stepper
        label="Weight"
        value={`${value.weightKg} kg`}
        onMinus={() => weight(value.weightKg - 1)}
        onPlus={() => weight(value.weightKg + 1)}
      />
      <Label>Activity</Label>
      <ChipRow>
        {(Object.keys(ACTIVITY_LABELS) as Activity[]).map((a) => (
          <Chip key={a} label={ACTIVITY_LABELS[a]} selected={value.activity === a} onPress={() => set({ activity: a })} />
        ))}
      </ChipRow>
    </View>
  );
}

function Label({ children }: { children: string }) {
  return <Text style={{ fontSize: 14, fontWeight: '600', color: colors.muted }}>{children}</Text>;
}
