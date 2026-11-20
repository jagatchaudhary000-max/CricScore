import { StyleSheet, Text, View } from 'react-native';
import type { DismissalCount } from '../lib/stats';
import { DISMISSALS, DISMISSAL_LABELS } from '../types';
import { colors, spacing } from '../theme';

/** Horizontal bars: one row per way you've been dismissed, with count and share. */
export function DismissalChart({ data }: { data: DismissalCount[] }) {
  if (data.length === 0) {
    return <Text style={styles.empty}>You haven't been dismissed yet.</Text>;
  }
  const max = Math.max(...data.map((d) => d.count));
  return (
    <View style={{ gap: spacing.md }}>
      {data.map((d) => {
        const color = colors.chart[DISMISSALS.indexOf(d.type)];
        return (
          <View key={d.type}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>{DISMISSAL_LABELS[d.type]}</Text>
              <Text style={styles.value}>
                {d.count} · {Math.round(d.percent)}%
              </Text>
            </View>
            <View style={styles.track}>
              <View style={[styles.bar, { width: `${(d.count / max) * 100}%`, backgroundColor: color }]} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { color: colors.muted },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { color: colors.text, fontSize: 14, fontWeight: '500' },
  value: { color: colors.muted, fontSize: 13, fontVariant: ['tabular-nums'] },
  track: { height: 10, borderRadius: 5, backgroundColor: colors.bg, overflow: 'hidden' },
  bar: { height: '100%', borderRadius: 5 },
});
