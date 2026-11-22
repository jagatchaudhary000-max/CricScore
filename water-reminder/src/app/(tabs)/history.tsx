import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useAppState } from '../../hooks/AppState';
import { dailyTotals } from '../../db/intakeRepo';
import { WeekChart } from '../../components/WeekChart';
import { Card, Hint, SectionTitle, StatTile } from '../../components/ui';
import { formatAmount } from '../../lib/hydration';
import { currentStreak, lastNDays, summarize } from '../../lib/stats';
import { formatDay, shiftDay } from '../../lib/time';
import type { DayTotal } from '../../types';
import { colors, spacing } from '../../theme';

const HISTORY_DAYS = 30;

export default function HistoryScreen() {
  const db = useSQLiteContext();
  const { settings, today, version } = useAppState();
  const { goalMl, unit } = settings;
  const [totals, setTotals] = useState<DayTotal[]>([]);

  useEffect(() => {
    // Look back a year so long streaks are counted correctly.
    dailyTotals(db, shiftDay(today, -365)).then(setTotals);
  }, [db, today, version]);

  const week = lastNDays(totals, today, 7);
  const month = lastNDays(totals, today, HISTORY_DAYS);
  const weekStats = summarize(week, goalMl);
  const streak = currentStreak(totals, today, goalMl);
  const recent = month.filter((d) => d.totalMl > 0).reverse();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Card>
        <View style={styles.tiles}>
          <StatTile label="Day streak 🔥" value={String(streak)} />
          <StatTile label="Avg / day (7 d)" value={formatAmount(weekStats.averageMl, unit)} />
          <StatTile label="Goals met (7 d)" value={`${weekStats.daysMet}/7`} />
        </View>
      </Card>

      <Card>
        <SectionTitle>Last 7 days</SectionTitle>
        <WeekChart days={week} goalMl={goalMl} unit={unit} />
      </Card>

      <Card>
        <SectionTitle>Last {HISTORY_DAYS} days</SectionTitle>
        {recent.length === 0 ? (
          <Hint>No drinks logged yet. Your daily totals will show up here.</Hint>
        ) : (
          recent.map((d) => {
            const pct = Math.round((d.totalMl / goalMl) * 100);
            return (
              <View key={d.day} style={styles.row}>
                <Text style={styles.day}>{d.day === today ? 'Today' : formatDay(d.day)}</Text>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${Math.min(100, pct)}%`, backgroundColor: pct >= 100 ? colors.success : colors.water },
                    ]}
                  />
                </View>
                <Text style={styles.amount}>{formatAmount(d.totalMl, unit)}</Text>
              </View>
            );
          })
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 40 },
  tiles: { flexDirection: 'row' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: 8 },
  day: { width: 92, fontSize: 14, color: colors.text },
  track: { flex: 1, height: 8, borderRadius: 4, backgroundColor: colors.primarySoft, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
  amount: { width: 74, textAlign: 'right', fontSize: 13, color: colors.muted, fontVariant: ['tabular-nums'] },
});
