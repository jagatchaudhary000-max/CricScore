import { StyleSheet, Text, View } from 'react-native';
import { itemVideoQuery, type GuideBlock } from '../content';
import { VideoPill } from './VideoLinks';
import { colors, radius, spacing } from '../theme';

/** `itemVideoSuffix`: when set, each item card gets a "▶ Video" button. */
export function GuideBlockView({ block, itemVideoSuffix }: { block: GuideBlock; itemVideoSuffix?: string }) {
  switch (block.kind) {
    case 'text':
      return <Text style={styles.text}>{block.text}</Text>;
    case 'bullets':
      return (
        <View style={{ gap: spacing.sm }}>
          {block.items.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[styles.text, { flex: 1 }]}>{item}</Text>
            </View>
          ))}
        </View>
      );
    case 'items':
      return (
        <View style={{ gap: spacing.sm }}>
          {block.items.map((item, i) => (
            <View key={i} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.dose ? <Text style={styles.dose}>{item.dose}</Text> : null}
              </View>
              <Text style={styles.itemHow}>{item.how}</Text>
              {itemVideoSuffix ? <VideoPill query={itemVideoQuery(item.name, itemVideoSuffix)} /> : null}
            </View>
          ))}
        </View>
      );
    case 'note': {
      const warn = block.tone === 'warning';
      return (
        <View style={[styles.note, warn ? styles.noteWarn : styles.noteTip]}>
          <Text style={styles.noteIcon}>{warn ? '⚠️' : '💡'}</Text>
          <Text style={[styles.text, { flex: 1, color: warn ? colors.danger : colors.primary }]}>{block.text}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  text: { fontSize: 15, lineHeight: 22, color: colors.text },
  bulletRow: { flexDirection: 'row', gap: spacing.sm },
  bullet: { fontSize: 15, lineHeight: 22, color: colors.primary, fontWeight: '800' },
  item: {
    backgroundColor: colors.bg,
    borderRadius: radius.sm,
    padding: spacing.md,
    gap: 4,
  },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.sm },
  itemName: { fontSize: 15, fontWeight: '700', color: colors.text, flex: 1 },
  dose: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
    maxWidth: '50%',
    textAlign: 'center',
  },
  itemHow: { fontSize: 14, lineHeight: 20, color: colors.muted },
  note: { flexDirection: 'row', gap: spacing.sm, padding: spacing.md, borderRadius: radius.sm },
  noteTip: { backgroundColor: colors.primarySoft },
  noteWarn: { backgroundColor: colors.dangerSoft },
  noteIcon: { fontSize: 16, lineHeight: 22 },
});
