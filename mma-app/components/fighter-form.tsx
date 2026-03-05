import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Fighter, FighterInput } from '../types/fighter';

type FighterFormProps = {
  initial?: Fighter;
  submitLabel: string;
  onSubmit: (value: FighterInput) => Promise<void>;
};

export function FighterForm({ initial, submitLabel, onSubmit }: FighterFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [weightClass, setWeightClass] = useState(initial?.weightClass ?? '');
  const [gym, setGym] = useState(initial?.gym ?? '');
  const [wins, setWins] = useState(String(initial?.wins ?? 0));
  const [losses, setLosses] = useState(String(initial?.losses ?? 0));
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const isValid = useMemo(() => name.trim() && weightClass.trim() && gym.trim(), [name, weightClass, gym]);

  async function handleSubmit() {
    if (!isValid || isSaving) {
      return;
    }

    setIsSaving(true);
    setError('');

    const payload: FighterInput = {
      name: name.trim(),
      weightClass: weightClass.trim(),
      gym: gym.trim(),
      wins: Number(wins) || 0,
      losses: Number(losses) || 0,
      notes: notes.trim(),
    };

    try {
      await onSubmit(payload);
    } catch {
      setError('Unable to save fighter. Try again.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.form}>
      <Input label="Name" value={name} onChangeText={setName} placeholder="Israel Adesanya" />
      <Input
        label="Weight class"
        value={weightClass}
        onChangeText={setWeightClass}
        placeholder="Middleweight"
      />
      <Input label="Gym" value={gym} onChangeText={setGym} placeholder="City Kickboxing" />
      <Input label="Wins" value={wins} onChangeText={setWins} keyboardType="numeric" placeholder="24" />
      <Input
        label="Losses"
        value={losses}
        onChangeText={setLosses}
        keyboardType="numeric"
        placeholder="3"
      />
      <Input
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        placeholder="Striking specialist"
        multiline
      />

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Pressable style={[styles.button, !isValid && styles.buttonDisabled]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isSaving ? 'Saving...' : submitLabel}</Text>
      </Pressable>
    </View>
  );
}

type InputProps = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'numeric';
  multiline?: boolean;
};

function Input({ label, ...props }: InputProps) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, props.multiline && styles.inputMultiline]}
        placeholderTextColor="#64748b"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
  },
  group: {
    gap: 6,
  },
  label: {
    color: '#cbd5e1',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 6,
    borderRadius: 10,
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#e0f2fe',
    fontWeight: '700',
  },
  error: {
    color: '#fda4af',
  },
});
