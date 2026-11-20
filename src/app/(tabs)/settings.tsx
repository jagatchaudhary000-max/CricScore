import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Constants from 'expo-constants';
import { useSQLiteContext } from 'expo-sqlite';
import { deleteAllMatches, importMatches, listMatches } from '../../db/matchRepo';
import { buildBackup, parseBackup } from '../../lib/backup';
import { todayIso } from '../../lib/format';
import { Button, Card, SectionTitle } from '../../components/ui';
import { colors, spacing } from '../../theme';

export default function SettingsScreen() {
  const db = useSQLiteContext();
  const [busy, setBusy] = useState(false);

  async function exportBackup() {
    setBusy(true);
    try {
      const matches = await listMatches(db);
      const file = new File(Paths.cache, `jagat-cricket-backup-${todayIso()}.json`);
      if (file.exists) file.delete();
      file.create();
      await file.write(buildBackup(matches));
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Sharing not available', 'This device cannot share files.');
        return;
      }
      await Sharing.shareAsync(file.uri, { mimeType: 'application/json', dialogTitle: 'Save Jagat Cricket backup' });
    } catch (e) {
      Alert.alert('Export failed', e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function importBackup() {
    try {
      const picked = await File.pickFileAsync({ mimeTypes: ['application/json', 'text/plain', '*/*'] });
      if (picked.canceled) return;
      const { matches, skipped } = parseBackup(await picked.result.text());
      if (matches.length === 0) {
        Alert.alert('Nothing to import', 'The file has no valid matches.');
        return;
      }
      const skippedNote = skipped > 0 ? `\n${skipped} invalid entries will be skipped.` : '';
      Alert.alert('Import backup', `Found ${matches.length} matches.${skippedNote}`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add to my matches', onPress: () => runImport(matches, false) },
        { text: 'Replace all', style: 'destructive', onPress: () => runImport(matches, true) },
      ]);
    } catch (e) {
      Alert.alert('Import failed', e instanceof Error ? e.message : String(e));
    }
  }

  async function runImport(matches: Parameters<typeof importMatches>[1], replace: boolean) {
    setBusy(true);
    try {
      await importMatches(db, matches, replace);
      Alert.alert('Import complete', `${matches.length} matches imported.`);
    } catch (e) {
      Alert.alert('Import failed', e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  function clearAll() {
    Alert.alert('Delete ALL matches?', 'This permanently removes every match on this phone. Export a backup first.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete all',
        style: 'destructive',
        onPress: async () => {
          await deleteAllMatches(db);
          Alert.alert('Done', 'All matches deleted.');
        },
      },
    ]);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.section}>
        <SectionTitle>Backup</SectionTitle>
        <Text style={styles.text}>
          Your matches are stored only on this phone. Export a backup file regularly and keep it somewhere safe (Google
          Drive, email, WhatsApp) so you can restore it on a new phone.
        </Text>
        <Button label="Export backup" onPress={exportBackup} disabled={busy} />
        <Button label="Import backup" variant="secondary" onPress={importBackup} disabled={busy} />
      </Card>

      <Card style={styles.section}>
        <SectionTitle>Danger zone</SectionTitle>
        <Button label="Delete all matches" variant="danger" onPress={clearAll} disabled={busy} />
      </Card>

      <Text style={styles.version}>Jagat Cricket v{Constants.expoConfig?.version ?? '1.0.0'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg },
  section: { gap: spacing.md },
  text: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  version: { color: colors.muted, textAlign: 'center', fontSize: 12 },
});
