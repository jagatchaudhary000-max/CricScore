import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { MatchForm } from '../../../components/MatchForm';
import { EmptyState } from '../../../components/ui';
import { getMatch, updateMatch } from '../../../db/matchRepo';
import type { Match } from '../../../types';

export default function EditMatchScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const db = useSQLiteContext();
  const [match, setMatch] = useState<Match | null | undefined>(undefined);

  useEffect(() => {
    getMatch(db, Number(id)).then(setMatch);
  }, [db, id]);

  if (match === undefined) return null;
  if (match === null) return <EmptyState title="Match not found" message="It may have been deleted." />;

  return (
    <MatchForm
      initial={match}
      submitLabel="Save changes"
      onSubmit={async (input) => {
        await updateMatch(db, match.id, input);
        router.back();
      }}
    />
  );
}
