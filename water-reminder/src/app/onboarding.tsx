import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAppState } from '../hooks/AppState';
import { ProfileForm, type Profile } from '../components/ProfileForm';
import { ScheduleForm, type Schedule } from '../components/ScheduleForm';
import { Button, Card, Hint, SectionTitle } from '../components/ui';
import { formatAmount, recommendedGoalMl } from '../lib/hydration';
import { ensurePermission } from '../lib/notifications';
import { colors, spacing } from '../theme';

export default function OnboardingScreen() {
  const { settings, updateSettings } = useAppState();
  const [profile, setProfile] = useState<Profile>({
    gender: settings.gender,
    weightKg: settings.weightKg,
    activity: settings.activity,
  });
  const [schedule, setSchedule] = useState<Schedule>({
    wakeMin: settings.wakeMin,
    sleepMin: settings.sleepMin,
    intervalMin: settings.intervalMin,
  });
  const [saving, setSaving] = useState(false);
  const goal = recommendedGoalMl(profile.weightKg, profile.gender, profile.activity);

  async function finish() {
    setSaving(true);
    const granted = await ensurePermission().catch(() => false);
    await updateSettings({ ...profile, ...schedule, goalMl: goal, remindersOn: granted, onboarded: true });
    router.replace('/');
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.drop}>💧</Text>
        <Text style={styles.title}>Let's set your daily water goal</Text>
        <Hint>Tell us a bit about yourself and when you're awake. We'll remind you to drink during the day.</Hint>
      </View>

      <Card>
        <SectionTitle>About you</SectionTitle>
        <ProfileForm value={profile} onChange={setProfile} />
      </Card>

      <Card style={styles.goalCard}>
        <Text style={styles.goalLabel}>Your daily goal</Text>
        <Text style={styles.goalValue}>{formatAmount(goal, 'ml')}</Text>
        <Hint>You can change it any time in Settings.</Hint>
      </Card>

      <Card>
        <SectionTitle>Your day</SectionTitle>
        <ScheduleForm value={schedule} onChange={setSchedule} />
      </Card>

      <Button label={saving ? 'Saving…' : 'Start drinking 💧'} onPress={finish} disabled={saving} />
      <Hint>The app will ask for permission to send notifications, so it can remind you.</Hint>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 40 },
  hero: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.md },
  drop: { fontSize: 56 },
  title: { fontSize: 22, fontWeight: '800', color: colors.text, textAlign: 'center' },
  goalCard: { alignItems: 'center', backgroundColor: colors.primarySoft, borderColor: colors.primarySoft, gap: 4 },
  goalLabel: { fontSize: 14, color: colors.primaryDark, fontWeight: '600' },
  goalValue: { fontSize: 34, fontWeight: '800', color: colors.primaryDark },
});
