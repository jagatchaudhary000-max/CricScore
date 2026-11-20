import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { deleteMatch, getMatch } from '../../../db/matchRepo';
import { formatDate } from '../../../lib/format';
import { formatStat } from '../../../lib/stats';
import { Button, Card, EmptyState } from '../../../components/ui';
import { DISMISSAL_LABELS, type Match } from '../../../types';
import { colors, spacing } from '../../../theme';

export default function MatchDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const [match, setMatch] = useState<Match | null | undefined>(undefined);

  useFocusEffect(
    useCallback(() => {
      getMatch(db, Number(id)).then(setMatch);
    }, [db, id]),
  );

  if (match === undefined) return null;
  if (match === null) return <EmptyState title="Match not found" message="It may have been deleted." />;

  const m = match;
  const strikeRate = m.balls > 0 ? (m.runs / m.balls) * 100 : null;

  function confirmDelete() {
    Alert.alert('Delete this match?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteMatch(db, m.id);
          router.back();
        },
      },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: formatDate(m.date) }} />
      <Card style={styles.hero}>
        <Text style={styles.score}>
          {m.runs}
          {m.isOut ? '' : '*'}
          <Text style={styles.balls}> ({m.balls})</Text>
        </Text>
        <Text style={styles.how}>{m.isOut && m.dismissal ? DISMISSAL_LABELS[m.dismissal] : 'Not out'}</Text>
      </Card>

      <Card style={{ gap: spacing.md }}>
        <Detail label="Strike rate" value={formatStat(strikeRate)} />
        <Detail label="4s / 6s" value={`${m.fours} / ${m.sixes}`} />
        <Detail label="Date" value={formatDate(m.date)} />
        <Detail label="Opponent" value={m.opponent || '-'} />
        <Detail label="Venue" value={m.venue || '-'} />
        <Detail label="Format" value={m.format || '-'} />
        {m.notes ? (
          <View style={{ gap: 4 }}>
            <Text style={styles.label}>Notes</Text>
            <Text style={styles.notes}>{m.notes}</Text>
          </View>
        ) : null}
      </Card>

      <Button label="Edit" variant="secondary" onPress={() => router.push(`/match/${m.id}/edit`)} />
      <Button label="Delete" variant="danger" onPress={confirmDelete} />
    </ScrollView>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg },
  hero: { alignItems: 'center', gap: spacing.xs },
  score: { fontSize: 48, fontWeight: '800', color: colors.primary, fontVariant: ['tabular-nums'] },
  balls: { fontSize: 22, fontWeight: '500', color: colors.muted },
  how: { fontSize: 16, color: colors.text, fontWeight: '600' },
  detail: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: colors.muted, fontSize: 14 },
  value: { color: colors.text, fontSize: 14, fontWeight: '600', flexShrink: 1, textAlign: 'right' },
  notes: { color: colors.text, fontSize: 14 },
});
