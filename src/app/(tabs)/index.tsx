import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useMatches } from '../../hooks/useMatches';
import { computeSummary, dismissalBreakdown, formatStat, recentForm } from '../../lib/stats';
import { StatCard } from '../../components/StatCard';
import { DismissalChart } from '../../components/DismissalChart';
import { FormChart } from '../../components/FormChart';
import { Button, Card, EmptyState, SectionTitle } from '../../components/ui';
import { spacing } from '../../theme';

export default function Dashboard() {
  const { matches, loading } = useMatches();
  const summary = useMemo(() => computeSummary(matches), [matches]);
  const dismissals = useMemo(() => dismissalBreakdown(matches), [matches]);
  const form = useMemo(() => recentForm(matches, 10), [matches]);

  if (loading) return null;

  if (matches.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <EmptyState title="No matches yet" message="Add your first innings and your stats will show up here." />
        <Button label="Add a match" onPress={() => router.push('/add')} />
      </View>
    );
  }

  const hs = summary.highestScore;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        <StatCard label="Matches" value={String(summary.matches)} />
        <StatCard label="Total runs" value={String(summary.totalRuns)} />
        <StatCard label="Balls faced" value={String(summary.totalBalls)} />
        <StatCard label="Batting average" value={formatStat(summary.battingAverage)} hint="runs ÷ times out" />
        <StatCard label="Runs per match" value={formatStat(summary.runsPerMatch)} />
        <StatCard label="Strike rate" value={formatStat(summary.strikeRate)} hint="runs per 100 balls" />
        <StatCard label="Highest score" value={hs ? `${hs.runs}${hs.notOut ? '*' : ''}` : '-'} />
        <StatCard label="Not outs" value={String(summary.notOuts)} />
        <StatCard label="50s / 100s" value={`${summary.fifties} / ${summary.hundreds}`} />
        <StatCard label="Ducks" value={String(summary.ducks)} />
        <StatCard label="4s / 6s" value={`${summary.totalFours} / ${summary.totalSixes}`} />
        <StatCard label="Times out" value={String(summary.outs)} />
      </View>

      <Card>
        <SectionTitle>How you got out</SectionTitle>
        <DismissalChart data={dismissals} />
      </Card>

      <Card>
        <SectionTitle>Recent form (last {form.length})</SectionTitle>
        <FormChart matches={form} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  emptyWrap: { flex: 1, justifyContent: 'center', padding: spacing.xl, gap: spacing.lg },
});
