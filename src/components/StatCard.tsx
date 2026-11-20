import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
      <Text style={styles.label}>{label}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  value: { fontSize: 26, fontWeight: '800', color: colors.text, fontVariant: ['tabular-nums'] },
  label: { fontSize: 13, color: colors.muted, marginTop: 2 },
  hint: { fontSize: 11, color: colors.muted, marginTop: 2, opacity: 0.8 },
});
