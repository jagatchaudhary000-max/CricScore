import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import type { Settings } from '../types';
import { formatAmount, reminderTimes } from './hydration';

export const CHANNEL_ID = 'water-reminders';
export const CATEGORY_ID = 'drink-reminder';
export const ACTION_DRINK = 'drink';

const MESSAGES = [
  'Time for a glass of water 💧',
  'Stay hydrated! Take a few sips 💦',
  'Your body will thank you. Drink some water 🥤',
  'Water break! Keep your streak going 🌊',
  'A quick drink keeps you fresh and focused 💧',
];

/** Shows reminders even while the app is open. Call once at startup. */
export function configureNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

/** Android channel and the "Drank it" action button. Safe to call on every start. */
export async function setupNotificationChannel(cupLabel: string) {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Drink water reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 150, 250],
      lightColor: '#1E88E5',
    });
  }
  await Notifications.setNotificationCategoryAsync(CATEGORY_ID, [
    // Opens the app so the drink is logged reliably, even if Android had closed it.
    { identifier: ACTION_DRINK, buttonTitle: `Drank ${cupLabel} ✓`, options: { opensAppToForeground: true } },
  ]);
}

export async function ensurePermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) return false;
  return (await Notifications.requestPermissionsAsync()).granted;
}

/**
 * Replaces all scheduled reminders with one repeating daily notification per reminder time.
 * Returns the number scheduled (0 when reminders are off or permission is missing).
 */
export async function rescheduleReminders(s: Settings): Promise<number> {
  if (Platform.OS === 'web') return 0;
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (!s.remindersOn) return 0;
  const perm = await Notifications.getPermissionsAsync();
  if (!perm.granted) return 0;

  const cup = formatAmount(s.cupMl, s.unit);
  await setupNotificationChannel(cup);
  const times = reminderTimes(s.wakeMin, s.sleepMin, s.intervalMin);
  for (const [i, t] of times.entries()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Drink water',
        body: MESSAGES[i % MESSAGES.length],
        categoryIdentifier: CATEGORY_ID,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: Math.floor(t / 60),
        minute: t % 60,
        channelId: CHANNEL_ID,
      },
    });
  }
  return times.length;
}

export async function sendTestNotification(s: Settings) {
  await setupNotificationChannel(formatAmount(s.cupMl, s.unit));
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Drink water', body: 'This is how your reminders will look 💧', categoryIdentifier: CATEGORY_ID },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 3, channelId: CHANNEL_ID },
  });
}
