import { StyleSheet, Text, View } from 'react-native';
import type { Match } from '../types';
import { colors, spacing } from '../theme';

const CHART_HEIGHT = 120;

/** Vertical bars for recent innings, oldest on the left. Not-out scores are marked with *. */
export function FormChart({ matches }: { matches: Match[] }) {
  const max = Math.max(10, ...matches.map((m) => m.runs));
  return (
    <View>
      <View style={styles.chart}>
        {matches.map((m) => (
          <View key={m.id} style={styles.col}>
            <Text style={styles.score} numberOfLines={1}>
              {m.runs}
              {m.isOut ? '' : '*'}
            </Text>
            <View
              style={[
                styles.bar,
                {
                  height: Math.max(3, (m.runs / max) * CHART_HEIGHT),
                  backgroundColor: m.isOut ? colors.primary : colors.chart[1],
                },
              ]}
            />
          </View>
        ))}
      </View>
      <View style={styles.legend}>
        <LegendDot color={colors.primary} label="Out" />
        <LegendDot color={colors.chart[1]} label="Not out (*)" />
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
    height: CHART_HEIGHT + 20,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  col: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  score: { fontSize: 11, color: colors.muted, marginBottom: 2, fontVariant: ['tabular-nums'] },
  bar: { width: '100%', maxWidth: 28, borderTopLeftRadius: 4, borderTopRightRadius: 4 },
  legend: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.sm },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: colors.muted },
});
