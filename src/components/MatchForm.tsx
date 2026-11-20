import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { DISMISSALS, DISMISSAL_LABELS, FORMATS, type Dismissal, type MatchInput } from '../types';
import { validateMatch, type ValidationErrors } from '../lib/validation';
import { todayIso } from '../lib/format';
import { Button, Card, Chip } from './ui';
import { colors, radius, spacing } from '../theme';

interface Props {
  initial?: MatchInput;
  submitLabel: string;
  onSubmit: (m: MatchInput) => Promise<void>;
}

const toInt = (s: string) => (s.trim() === '' ? NaN : Number(s));

export function MatchForm({ initial, submitLabel, onSubmit }: Props) {
  const [date, setDate] = useState(initial?.date ?? todayIso());
  const [opponent, setOpponent] = useState(initial?.opponent ?? '');
  const [venue, setVenue] = useState(initial?.venue ?? '');
  const [format, setFormat] = useState(initial?.format ?? '');
  const [runs, setRuns] = useState(initial ? String(initial.runs) : '');
  const [balls, setBalls] = useState(initial ? String(initial.balls) : '');
  const [fours, setFours] = useState(initial ? String(initial.fours) : '');
  const [sixes, setSixes] = useState(initial ? String(initial.sixes) : '');
  const [isOut, setIsOut] = useState(initial?.isOut ?? true);
  const [dismissal, setDismissal] = useState<Dismissal | null>(initial?.dismissal ?? null);
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [saving, setSaving] = useState(false);

  async function submit() {
    const input: MatchInput = {
      date: date.trim(),
      opponent,
      venue,
      format,
      runs: toInt(runs),
      balls: toInt(balls),
      fours: fours.trim() === '' ? 0 : toInt(fours),
      sixes: sixes.trim() === '' ? 0 : toInt(sixes),
      isOut,
      dismissal: isOut ? dismissal : null,
      notes,
    };
    const errs = validateMatch(input);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSaving(true);
    try {
      await onSubmit(input);
    } finally {
      setSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>Your innings</Text>
          <View style={styles.row}>
            <Field label="Runs *" error={errors.runs} style={{ flex: 1 }}>
              <NumberInput value={runs} onChangeText={setRuns} placeholder="0" />
            </Field>
            <Field label="Balls faced *" error={errors.balls} style={{ flex: 1 }}>
              <NumberInput value={balls} onChangeText={setBalls} placeholder="0" />
            </Field>
          </View>
          <View style={styles.row}>
            <Field label="4s" error={errors.fours} style={{ flex: 1 }}>
              <NumberInput value={fours} onChangeText={setFours} placeholder="0" />
            </Field>
            <Field label="6s" error={errors.sixes} style={{ flex: 1 }}>
              <NumberInput value={sixes} onChangeText={setSixes} placeholder="0" />
            </Field>
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>{isOut ? 'Out' : 'Not out'}</Text>
            <Switch
              value={isOut}
              onValueChange={setIsOut}
              trackColor={{ true: colors.primary, false: colors.border }}
              thumbColor="#FFFFFF"
            />
          </View>

          {isOut && (
            <Field label="How out *" error={errors.dismissal}>
              <View style={styles.chips}>
                {DISMISSALS.map((d) => (
                  <Chip key={d} label={DISMISSAL_LABELS[d]} selected={dismissal === d} onPress={() => setDismissal(d)} />
                ))}
              </View>
            </Field>
          )}
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>Match details</Text>
          <Field label="Date * (YYYY-MM-DD)" error={errors.date}>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              placeholder="2026-11-20"
              keyboardType="numbers-and-punctuation"
              maxLength={10}
            />
          </Field>
          <Field label="Opponent">
            <TextInput style={styles.input} value={opponent} onChangeText={setOpponent} placeholder="e.g. Street XI" />
          </Field>
          <Field label="Venue">
            <TextInput style={styles.input} value={venue} onChangeText={setVenue} placeholder="e.g. School ground" />
          </Field>
          <Field label="Format">
            <View style={styles.chips}>
              {FORMATS.map((f) => (
                <Chip key={f} label={f} selected={format === f} onPress={() => setFormat(format === f ? '' : f)} />
              ))}
            </View>
          </Field>
          <Field label="Notes">
            <TextInput
              style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
              value={notes}
              onChangeText={setNotes}
              placeholder="e.g. Dropped on 12"
              multiline
            />
          </Field>
        </Card>

        {Object.keys(errors).length > 0 && <Text style={styles.formError}>Please fix the highlighted fields.</Text>}
        <Button label={saving ? 'Saving…' : submitLabel} onPress={submit} disabled={saving} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({
  label,
  error,
  children,
  style,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  style?: object;
}) {
  return (
    <View style={[{ gap: 6 }, style]}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

function NumberInput(props: { value: string; onChangeText: (s: string) => void; placeholder: string }) {
  return (
    <TextInput
      style={styles.input}
      keyboardType="number-pad"
      maxLength={4}
      {...props}
      onChangeText={(s) => props.onChangeText(s.replace(/[^0-9]/g, ''))}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xl * 2 },
  section: { gap: spacing.md },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: colors.muted, textTransform: 'uppercase' },
  row: { flexDirection: 'row', gap: spacing.md },
  label: { fontSize: 14, fontWeight: '600', color: colors.text },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.bg,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  switchLabel: { fontSize: 16, fontWeight: '600', color: colors.text },
  error: { color: colors.danger, fontSize: 12 },
  formError: { color: colors.danger, textAlign: 'center' },
});
