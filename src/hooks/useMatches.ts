import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { listMatches } from '../db/matchRepo';
import type { Match } from '../types';

/** Loads all matches and reloads every time the screen comes into focus. */
export function useMatches() {
  const db = useSQLiteContext();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setMatches(await listMatches(db));
    setLoading(false);
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  return { matches, loading, reload };
}
