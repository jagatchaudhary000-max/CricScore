import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import { youtubeSearchUrl } from '../content';
import { colors, radius, spacing } from '../theme';

/** Opens YouTube (app if installed, otherwise the browser) with a search for `query`. */
export async function openVideo(query: string) {
  try {
    await Linking.openURL(youtubeSearchUrl(query));
  } catch {
    Alert.alert('Could not open YouTube', 'Check that you are connected to the internet and try again.');
  }
}

/** "▶ Video" pill shown on an exercise / drill card. */
export function VideoPill({ query }: { query: string }) {
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={`Watch video: ${query}`}
      onPress={() => openVideo(query)}
      hitSlop={8}
      style={({ pressed }) => [styles.pill, pressed && { opacity: 0.6 }]}
    >
      <Text style={styles.pillText}>▶ Video</Text>
    </Pressable>
  );
}

/** The "Watch videos" list at the bottom of a guide section. */
export function VideoLinks({ videos }: { videos: { title: string; query: string }[] }) {
  if (videos.length === 0) return null;
  return (
    <View style={styles.box}>
      <Text style={styles.heading}>📺 Watch videos</Text>
      {videos.map((v) => (
        <Pressable
          key={v.query}
          accessibilityRole="link"
          onPress={() => openVideo(v.query)}
          style={({ pressed }) => [styles.row, pressed && { opacity: 0.6 }]}
        >
          <View style={styles.play}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
          <Text style={styles.title}>{v.title}</Text>
          <Text style={styles.arrow}>↗</Text>
        </Pressable>
      ))}
    </View>
  );
}

const YT_RED = '#D62C1F';

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: YT_RED,
    marginTop: 4,
  },
  pillText: { color: YT_RED, fontSize: 12, fontWeight: '700' },
  box: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  heading: { fontSize: 13, fontWeight: '700', color: colors.muted, textTransform: 'uppercase' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.bg,
  },
  play: {
    width: 36,
    height: 26,
    borderRadius: 6,
    backgroundColor: YT_RED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { color: '#FFFFFF', fontSize: 12 },
  title: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.text },
  arrow: { fontSize: 14, color: colors.muted },
});
