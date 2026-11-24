import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, type ScrollViewInstance } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { getTopic } from '../../content';
import { GuideBlockView } from '../../components/GuideBlocks';
import { VideoLinks } from '../../components/VideoLinks';
import { Card, Chip, EmptyState } from '../../components/ui';
import { colors, spacing } from '../../theme';

export default function GuideTopicScreen() {
  const { topic: topicId } = useLocalSearchParams<{ topic: string }>();
  const topic = getTopic(topicId);
  // null = show every section; otherwise the index of the one section to show.
  const [selected, setSelected] = useState<number | null>(null);
  const scrollRef = useRef<ScrollViewInstance>(null);

  if (!topic) return <EmptyState title="Not found" message="This guide topic does not exist." />;

  const select = (i: number | null) => {
    setSelected(i);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };
  const sections = topic.sections
    .map((s, i) => ({ s, i }))
    .filter(({ i }) => selected === null || selected === i);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: topic.title }} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipBar}
        contentContainerStyle={styles.chips}
      >
        <Chip label="All" selected={selected === null} onPress={() => select(null)} />
        {topic.sections.map((s, i) => (
          <Chip key={i} label={s.chip ?? s.title} selected={selected === i} onPress={() => select(i)} />
        ))}
      </ScrollView>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
        {selected === null && (
          <Text style={styles.summary}>
            {topic.emoji} {topic.summary}
            {'\n'}📺 Every section has videos. Tap one to watch it on YouTube (needs internet).
          </Text>
        )}
        {sections.map(({ s, i }) => (
          <Card key={i} style={{ gap: spacing.md }}>
            <Text style={styles.sectionTitle}>{s.title}</Text>
            {s.blocks.map((b, j) => (
              <GuideBlockView key={j} block={b} itemVideoSuffix={topic.itemVideoSuffix} />
            ))}
            <VideoLinks videos={s.videos ?? []} />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chipBar: {
    flexGrow: 0,
    backgroundColor: colors.card,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  chips: { gap: spacing.sm, padding: spacing.md },
  container: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xl * 2 },
  summary: { fontSize: 14, color: colors.muted, lineHeight: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text },
});
