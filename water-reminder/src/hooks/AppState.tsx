import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AppState as RNAppState, Platform } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import * as Notifications from 'expo-notifications';
import type { Intake, Settings } from '../types';
import { addIntake, deleteAllIntake, deleteIntake, listDay } from '../db/intakeRepo';
import { DEFAULT_SETTINGS, loadSettings, resetSettings, saveSettings } from '../db/settingsRepo';
import { ACTION_DRINK, configureNotificationHandler, rescheduleReminders } from '../lib/notifications';
import { dayKey } from '../lib/time';

if (Platform.OS !== 'web') configureNotificationHandler();

interface AppStateValue {
  settings: Settings;
  today: string;
  todayIntake: Intake[];
  todayTotalMl: number;
  /** Bumped after every change to drinks, so screens showing history know to reload. */
  version: number;
  drink: (amountMl: number) => Promise<void>;
  undo: (id: number) => Promise<void>;
  updateSettings: (patch: Partial<Settings>) => Promise<void>;
  resetAll: () => Promise<void>;
}

const Ctx = createContext<AppStateValue | null>(null);

/** Settings that change which reminders are scheduled (or their action button label). */
const REMINDER_KEYS: (keyof Settings)[] = ['remindersOn', 'intervalMin', 'wakeMin', 'sleepMin', 'cupMl', 'unit'];

export function AppStateProvider({ initial, children }: { initial: Settings; children: ReactNode }) {
  const db = useSQLiteContext();
  const [settings, setSettings] = useState(initial);
  const settingsRef = useRef(initial);
  const [today, setToday] = useState(dayKey());
  const [todayIntake, setTodayIntake] = useState<Intake[]>([]);
  const [version, setVersion] = useState(0);

  const reloadToday = useCallback(async () => {
    const day = dayKey();
    setToday(day);
    setTodayIntake(await listDay(db, day));
    setVersion((v) => v + 1);
  }, [db]);

  useEffect(() => {
    reloadToday();
    // Roll over to a new day when the app comes back to the foreground after midnight.
    const sub = RNAppState.addEventListener('change', (s) => s === 'active' && reloadToday());
    return () => sub.remove();
  }, [reloadToday]);

  const updateSettings = useCallback(
    async (patch: Partial<Settings>) => {
      const next = { ...settingsRef.current, ...patch };
      settingsRef.current = next;
      setSettings(next);
      await saveSettings(db, patch);
      if (REMINDER_KEYS.some((k) => k in patch)) await rescheduleReminders(next).catch(() => {});
    },
    [db],
  );

  const drink = useCallback(
    async (amountMl: number) => {
      await addIntake(db, amountMl);
      await reloadToday();
    },
    [db, reloadToday],
  );

  const undo = useCallback(
    async (id: number) => {
      await deleteIntake(db, id);
      await reloadToday();
    },
    [db, reloadToday],
  );

  const resetAll = useCallback(async () => {
    await deleteAllIntake(db);
    await resetSettings(db);
    await Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});
    settingsRef.current = DEFAULT_SETTINGS;
    setSettings(DEFAULT_SETTINGS);
    await reloadToday();
  }, [db, reloadToday]);

  // Keep the schedule in sync on start (e.g. after an app update or a permission change).
  useEffect(() => {
    if (initial.onboarded) rescheduleReminders(initial).catch(() => {});
  }, [initial]);

  const value = useMemo<AppStateValue>(
    () => ({
      settings,
      today,
      todayIntake,
      todayTotalMl: todayIntake.reduce((s, i) => s + i.amountMl, 0),
      version,
      drink,
      undo,
      updateSettings,
      resetAll,
    }),
    [settings, today, todayIntake, version, drink, undo, updateSettings, resetAll],
  );

  return (
    <Ctx.Provider value={value}>
      {Platform.OS !== 'web' && <DrinkActionHandler />}
      {children}
    </Ctx.Provider>
  );
}

/** "Drank it" pressed on a reminder: log one cup, once per notification. Native only. */
function DrinkActionHandler() {
  const { updateSettings, drink, settings } = useAppState();
  const handled = useRef(settings.lastHandledAction);
  const response = Notifications.useLastNotificationResponse();
  useEffect(() => {
    if (!response || response.actionIdentifier !== ACTION_DRINK) return;
    const key = `${response.notification.request.identifier}@${response.notification.date}`;
    if (handled.current === key) return;
    handled.current = key;
    (async () => {
      await updateSettings({ lastHandledAction: key });
      await drink(settings.cupMl);
      await Notifications.dismissNotificationAsync(response.notification.request.identifier).catch(() => {});
    })();
    // Only react to a new response, not to settings changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  return null;
}

export function useAppState(): AppStateValue {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppState must be used inside AppStateProvider');
  return v;
}

/** Loads settings from the database before the provider mounts. */
export function useInitialSettings(): Settings | null {
  const db = useSQLiteContext();
  const [s, setS] = useState<Settings | null>(null);
  useEffect(() => {
    loadSettings(db).then(setS);
  }, [db]);
  return s;
}
