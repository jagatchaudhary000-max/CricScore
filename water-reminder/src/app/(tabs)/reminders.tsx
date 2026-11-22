import { useCallback, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { useAppState } from '../../hooks/AppState';
import { ScheduleForm } from '../../components/ScheduleForm';
import { Button, Card, Hint, SectionTitle } from '../../components/ui';
import { reminderTimes } from '../../lib/hydration';
import { ensurePermission, sendTestNotification } from '../../lib/notifications';
import { formatClock } from '../../lib/time';
import { colors, spacing } from '../../theme';

export default function RemindersScreen() {
  const { settings, updateSettings } = useAppState();
  const [permitted, setPermitted] = useState(true);

  useFocusEffect(
    useCallback(() => {
      Notifications.getPermissionsAsync()
        .then((p) => setPermitted(p.granted))
        .catch(() => {});
    }, []),
  );

  async function toggle(on: boolean) {
    if (on) {
      const granted = await ensurePermission().catch(() => false);
      setPermitted(granted);
      if (!granted) {
        Alert.alert('Notifications are blocked', 'Allow notifications for this app in your phone settings to get reminders.', [
          { text: 'Not now', style: 'cancel' },
          { text: 'Open settings', onPress: () => Linking.openSettings() },
        ]);
        return;
      }
    }
    await updateSettings({ remindersOn: on });
  }

  async function test() {
    if (!(await ensurePermission().catch(() => false))) {
      setPermitted(false);
      return;
    }
    await sendTestNotification(settings);
    Alert.alert('Test sent', 'A sample reminder will appear in a few seconds.');
  }

  const times = reminderTimes(settings.wakeMin, settings.sleepMin, settings.intervalMin);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card>
        <View style={styles.switchRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.switchTitle}>Drink water reminders</Text>
            <Hint>Notifications between wake-up and bedtime, with a “Drank it” button that logs your cup.</Hint>
          </View>
          <Switch
            value={settings.remindersOn && permitted}
            onValueChange={toggle}
            trackColor={{ true: colors.water, false: colors.border }}
            thumbColor={settings.remindersOn && permitted ? colors.primary : '#FFFFFF'}
          />
        </View>
        {!permitted && (
          <View style={styles.warning}>
            <Text style={styles.warningText}>Notifications are turned off for this app.</Text>
            <Button label="Open phone settings" variant="secondary" onPress={() => Linking.openSettings()} />
          </View>
        )}
      </Card>

      <Card>
        <SectionTitle>Schedule</SectionTitle>
        <ScheduleForm
          value={{ wakeMin: settings.wakeMin, sleepMin: settings.sleepMin, intervalMin: settings.intervalMin }}
          onChange={(s) => updateSettings(s)}
        />
      </Card>

      <Card>
        <SectionTitle>
          {times.length} reminders a day
        </SectionTitle>
        <View style={styles.times}>
          {times.map((t) => (
            <Text key={t} style={[styles.time, !settings.remindersOn && { opacity: 0.4 }]}>
              {formatClock(t)}
            </Text>
          ))}
        </View>
      </Card>

      <Button label="Send a test reminder" variant="secondary" onPress={test} />
      <Hint>
        If reminders arrive late or not at all, turn off battery optimisation for this app in your phone's settings.
      </Hint>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 40 },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  switchTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 4 },
  warning: { marginTop: spacing.md, gap: spacing.sm },
  warningText: { color: colors.danger, fontWeight: '600' },
  times: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  time: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.primarySoft,
    color: colors.primaryDark,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
});
