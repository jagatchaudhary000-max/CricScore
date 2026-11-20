import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMatches } from '../../hooks/useMatches';
import { MatchRow } from '../../components/MatchRow';
import { Chip, EmptyState } from '../../components/ui';
import { FORMATS } from '../../types';
import { colors, radius, spacing } from '../../theme';

export default function MatchesScreen() {
  const { matches, loading } = useMatches();
  const [query, setQuery] = useState('');
  const [format, setFormat] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return matches.filter(
      (m) =>
        (!format || m.format === format) &&
        (!q || m.opponent.toLowerCase().includes(q) || m.venue.toLowerCase().includes(q) || m.notes.toLowerCase().includes(q)),
    );
  }, [matches, query, format]);

  if (loading) return null;
  if (matches.length === 0) {
    return <EmptyState title="No matches yet" message="Use the Add tab to record your first innings." />;
  }

  return (
    <FlatList
      data={filtered}
      keyExtractor={(m) => String(m.id)}
      renderItem={({ item }) => <MatchRow match={item} />}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <View style={{ gap: spacing.md }}>
          <TextInput
            style={styles.search}
            value={query}
            onChangeText={setQuery}
            placeholder="Search opponent, venue or notes"
            placeholderTextColor={colors.muted}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
            <Chip label="All" selected={format === null} onPress={() => setFormat(null)} />
            {FORMATS.map((f) => (
              <Chip key={f} label={f} selected={format === f} onPress={() => setFormat(format === f ? null : f)} />
            ))}
          </ScrollView>
          <Text style={styles.count}>
            {filtered.length} innings
          </Text>
        </View>
      }
      ListEmptyComponent={<Text style={styles.noResults}>No matches match your filters.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.lg, gap: spacing.sm },
  search: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
  },
  count: { color: colors.muted, fontSize: 13 },
  noResults: { color: colors.muted, textAlign: 'center', marginTop: spacing.xl },
});
