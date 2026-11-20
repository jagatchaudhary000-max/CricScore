import { useState } from 'react';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { MatchForm } from '../../components/MatchForm';
import { insertMatch } from '../../db/matchRepo';

export default function AddMatchScreen() {
  const db = useSQLiteContext();
  // Bumping the key after a save remounts the form with empty fields for the next innings.
  const [formKey, setFormKey] = useState(0);

  return (
    <MatchForm
      key={formKey}
      submitLabel="Save match"
      onSubmit={async (input) => {
        const id = await insertMatch(db, input);
        setFormKey((k) => k + 1);
        router.push(`/match/${id}`);
      }}
    />
  );
}
