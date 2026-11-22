import { StyleSheet, Text, View } from 'react-native';
import type { DayTotal, Unit } from '../types';
import { formatAmount } from '../lib/hydration';
import { weekdayShort } from '../lib/time';
import { colors, spacing } from '../theme';

const CHART_HEIGHT = 140;

/** One bar per day with a dashed goal line. Green bars met the goal. */
export function WeekChart({ days, goalMl, unit }: { days: DayTotal[]; goalMl: number; unit: Unit }) {
  const max = Math.max(goalMl * 1.15, ...days.map((d) => d.totalMl));
  const goalY = (goalMl / max) * CHART_HEIGHT;
  return (
    <View>
      <View style={styles.chart}>
        <View style={[styles.goalLine, { bottom: goalY }]} />
        {days.map((d) => {
          const met = d.totalMl >= goalMl;
          return (
            <View key={d.day} style={styles.col}>
              <Text style={styles.value} numberOfLines={1}>
                {d.totalMl > 0 ? formatAmount(d.totalMl, unit, false) : ''}
              </Text>
              <View
                style={[
                  styles.bar,
                  {
                    height: Math.max(3, (d.totalMl / max) * CHART_HEIGHT),
                    backgroundColor: met ? colors.success : colors.water,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.labels}>
        {days.map((d) => (
          <Text key={d.day} style={styles.dayLabel}>
            {weekdayShort(d.day)}
          </Text>
        ))}
      </View>
      <View style={styles.legend}>
        <LegendDot color={colors.success} label="Goal met" />
        <LegendDot color={colors.water} label="Below goal" />
        <View style={styles.legendItem}>
          <View style={styles.legendLine} />
          <Text style={styles.legendText}>Goal</Text>
        </View>
      </View>
    </View>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: CHART_HEIGHT + 18,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  goalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.primaryDark,
    opacity: 0.6,
  },
  col: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  value: { fontSize: 10, color: colors.muted, marginBottom: 2, fontVariant: ['tabular-nums'] },
  bar: { width: '100%', maxWidth: 30, borderTopLeftRadius: 5, borderTopRightRadius: 5 },
  labels: { flexDirection: 'row', gap: 6, marginTop: 4 },
  dayLabel: { flex: 1, textAlign: 'center', fontSize: 12, color: colors.muted },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg, marginTop: spacing.md },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  legendLine: { width: 14, borderTopWidth: 1.5, borderStyle: 'dashed', borderColor: colors.primaryDark },
  legendText: { fontSize: 12, color: colors.muted },
});
