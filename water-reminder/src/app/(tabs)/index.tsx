import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppState } from '../../hooks/AppState';
import { WaterGlass } from '../../components/WaterGlass';
import { Button, Card, Chip, ChipRow, Hint, SectionTitle } from '../../components/ui';
import { formatAmount, nextReminder, parseAmount, reminderTimes } from '../../lib/hydration';
import { formatClock, minuteOfDay } from '../../lib/time';
import { colors, radius, spacing } from '../../theme';

const CUP_SIZES_ML = [100, 150, 200, 250, 300, 400, 500];

export default function TodayScreen() {
  const { settings, todayIntake, todayTotalMl, drink, undo, updateSettings } = useAppState();
  const { unit, goalMl, cupMl } = settings;
  const [custom, setCustom] = useState('');
  const [celebrate, setCelebrate] = useState(false);
  const prevTotal = useRef(todayTotalMl);

  // Show a one-time "goal reached" banner when today's total crosses the goal.
  useEffect(() => {
    if (prevTotal.current < goalMl && todayTotalMl >= goalMl) setCelebrate(true);
    if (todayTotalMl < goalMl) setCelebrate(false);
    prevTotal.current = todayTotalMl;
  }, [todayTotalMl, goalMl]);

  const remaining = Math.max(0, goalMl - todayTotalMl);
  const next = settings.remindersOn
    ? nextReminder(reminderTimes(settings.wakeMin, settings.sleepMin, settings.intervalMin), minuteOfDay())
    : null;

  function addCustom() {
    const ml = parseAmount(custom, unit);
    if (ml === null) {
      Alert.alert('Check the amount', `Enter an amount between ${formatAmount(10, unit)} and ${formatAmount(3000, unit)}.`);
      return;
    }
    drink(ml);
    setCustom('');
  }

  function confirmUndo(id: number, amountMl: number, minute: number) {
    Alert.alert('Remove this drink?', `${formatAmount(amountMl, unit)} at ${formatClock(minute)}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => undo(id) },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card style={styles.hero}>
        <WaterGlass
          progress={goalMl ? todayTotalMl / goalMl : 0}
          label={`${formatAmount(todayTotalMl, unit, false)} / ${formatAmount(goalMl, unit)}`}
        />
        <Text style={styles.remaining}>
          {remaining > 0 ? `${formatAmount(remaining, unit)} to go` : 'Daily goal reached! 🎉'}
        </Text>
        {celebrate && (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>Great job! You hit today's goal. Keep it up tomorrow 💪</Text>
          </View>
        )}
        <View style={styles.drinkButton}>
          <Button label={`＋ Drink ${formatAmount(cupMl, unit)}`} onPress={() => drink(cupMl)} />
        </View>
        <Hint>
          {next !== null ? `Next reminder at ${formatClock(next)}` : 'Reminders are off. Turn them on in the Reminders tab.'}
        </Hint>
      </Card>

      <Card>
        <SectionTitle>Cup size</SectionTitle>
        <ChipRow>
          {CUP_SIZES_ML.map((ml) => (
            <Chip key={ml} label={formatAmount(ml, unit)} selected={cupMl === ml} onPress={() => updateSettings({ cupMl: ml })} />
          ))}
        </ChipRow>
        <View style={styles.customRow}>
          <TextInput
            value={custom}
            onChangeText={setCustom}
            placeholder={`Other amount (${unit === 'ml' ? 'ml' : 'fl oz'})`}
            placeholderTextColor={colors.muted}
            keyboardType="decimal-pad"
            returnKeyType="done"
            onSubmitEditing={addCustom}
            style={styles.input}
          />
          <Pressable onPress={addCustom} accessibilityRole="button" style={styles.addButton}>
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        </View>
      </Card>

      <Card>
        <SectionTitle>Today's drinks</SectionTitle>
        {todayIntake.length === 0 ? (
          <Hint>Nothing yet. Tap “Drink” after each glass of water.</Hint>
        ) : (
          todayIntake.map((i) => (
            <Pressable
              key={i.id}
              onLongPress={() => confirmUndo(i.id, i.amountMl, i.minute)}
              style={styles.logRow}
              accessibilityHint="Long-press to remove"
            >
              <Text style={styles.logEmoji}>🥛</Text>
              <Text style={styles.logAmount}>{formatAmount(i.amountMl, unit)}</Text>
              <Text style={styles.logTime}>{formatClock(i.minute)}</Text>
              <Pressable
                onPress={() => confirmUndo(i.id, i.amountMl, i.minute)}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel="Remove drink"
              >
                <Text style={styles.remove}>✕</Text>
              </Pressable>
            </Pressable>
          ))
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 40 },
  hero: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xl },
  remaining: { fontSize: 15, fontWeight: '600', color: colors.muted },
  banner: { backgroundColor: colors.successSoft, borderRadius: radius.md, padding: spacing.md, alignSelf: 'stretch' },
  bannerText: { color: colors.success, fontWeight: '600', textAlign: 'center' },
  drinkButton: { alignSelf: 'stretch' },
  customRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  input: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.bg,
  },
  addButton: {
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
  },
  addText: { color: colors.primary, fontWeight: '700', fontSize: 15 },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  logEmoji: { fontSize: 18 },
  logAmount: { flex: 1, fontSize: 15, fontWeight: '600', color: colors.text },
  logTime: { fontSize: 14, color: colors.muted, fontVariant: ['tabular-nums'] },
  remove: { fontSize: 16, color: colors.muted, paddingHorizontal: 4 },
});
