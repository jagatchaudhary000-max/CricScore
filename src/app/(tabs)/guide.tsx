import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { GUIDE_TOPICS } from '../../content';
import { colors, radius, spacing } from '../../theme';

export default function GuideScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.intro}>Prepare better, train smarter and know the game.</Text>
      {GUIDE_TOPICS.map((t) => (
        <Pressable
          key={t.id}
          accessibilityRole="button"
          onPress={() => router.push(`/guide/${t.id}`)}
          style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
        >
          <View style={styles.emojiBox}>
            <Text style={styles.emoji}>{t.emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.summary}>{t.summary}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.md },
  intro: { color: colors.muted, fontSize: 14 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  emojiBox: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 26 },
  title: { fontSize: 16, fontWeight: '700', color: colors.text },
  summary: { fontSize: 13, color: colors.muted, marginTop: 2, lineHeight: 18 },
  chevron: { fontSize: 24, color: colors.muted },
});
