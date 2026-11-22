import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import { useAppState } from '../../hooks/AppState';
import { ProfileForm } from '../../components/ProfileForm';
import { Button, Card, Chip, ChipRow, Hint, SectionTitle, Stepper } from '../../components/ui';
import { clampGoal, formatAmount, recommendedGoalMl } from '../../lib/hydration';
import { colors, spacing } from '../../theme';

const GOAL_STEP_ML = 50;

export default function SettingsScreen() {
  const { settings, updateSettings, resetAll } = useAppState();
  const { unit, goalMl } = settings;
  const [busy, setBusy] = useState(false);
  const recommended = recommendedGoalMl(settings.weightKg, settings.gender, settings.activity);

  function confirmReset() {
    Alert.alert('Delete all data?', 'This removes every drink you logged and resets your settings. It cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete everything',
        style: 'destructive',
        onPress: async () => {
          setBusy(true);
          try {
            await resetAll();
            router.replace('/onboarding');
          } finally {
            setBusy(false);
          }
        },
      },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card>
        <SectionTitle>Daily goal</SectionTitle>
        <Stepper
          label="Goal"
          value={formatAmount(goalMl, unit)}
          onMinus={() => updateSettings({ goalMl: clampGoal(goalMl - GOAL_STEP_ML) })}
          onPlus={() => updateSettings({ goalMl: clampGoal(goalMl + GOAL_STEP_ML) })}
        />
        <View style={styles.recommendRow}>
          <Hint>Recommended for you: {formatAmount(recommended, unit)}</Hint>
          {recommended !== goalMl && (
            <Text style={styles.link} onPress={() => updateSettings({ goalMl: recommended })} accessibilityRole="button">
              Use it
            </Text>
          )}
        </View>
      </Card>

      <Card>
        <SectionTitle>About you</SectionTitle>
        <ProfileForm
          value={{ gender: settings.gender, weightKg: settings.weightKg, activity: settings.activity }}
          onChange={(p) => updateSettings(p)}
        />
      </Card>

      <Card>
        <SectionTitle>Units</SectionTitle>
        <ChipRow>
          <Chip label="Millilitres (ml)" selected={unit === 'ml'} onPress={() => updateSettings({ unit: 'ml' })} />
          <Chip label="US fluid ounces (fl oz)" selected={unit === 'oz'} onPress={() => updateSettings({ unit: 'oz' })} />
        </ChipRow>
      </Card>

      <Card>
        <SectionTitle>Data</SectionTitle>
        <Hint>Everything is stored only on this phone. There is no account and no internet needed.</Hint>
        <View style={{ height: spacing.md }} />
        <Button label="Delete all data" variant="danger" onPress={confirmReset} disabled={busy} />
      </Card>

      <Hint>
        Goals are a general guide, not medical advice. Ask a doctor if you have a condition that affects how much you
        should drink. Version {Constants.expoConfig?.version ?? '1.0.0'}.
      </Hint>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 40 },
  recommendRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
  link: { color: colors.primary, fontWeight: '700', fontSize: 14 },
});
