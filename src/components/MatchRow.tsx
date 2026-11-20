import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import type { Match } from '../types';
import { DISMISSAL_LABELS } from '../types';
import { formatDate } from '../lib/format';
import { colors, radius, spacing } from '../theme';

export function MatchRow({ match: m }: { match: Match }) {
  const subtitle = [m.opponent ? `vs ${m.opponent}` : null, m.format || null, formatDate(m.date)]
    .filter(Boolean)
    .join(' · ');
  return (
    <Pressable
      onPress={() => router.push(`/match/${m.id}`)}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
      <View style={styles.scoreBox}>
        <Text style={styles.runs}>
          {m.runs}
          {m.isOut ? '' : '*'}
        </Text>
        <Text style={styles.balls}>({m.balls})</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{m.isOut && m.dismissal ? DISMISSAL_LABELS[m.dismissal] : 'Not out'}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  scoreBox: {
    width: 64,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
  },
  runs: { fontSize: 20, fontWeight: '800', color: colors.primary, fontVariant: ['tabular-nums'] },
  balls: { fontSize: 12, color: colors.muted, fontVariant: ['tabular-nums'] },
  title: { fontSize: 15, fontWeight: '600', color: colors.text },
  subtitle: { fontSize: 13, color: colors.muted, marginTop: 2 },
  chevron: { fontSize: 24, color: colors.muted },
});
