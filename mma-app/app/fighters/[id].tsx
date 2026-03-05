import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { deleteFighter, getFighterById } from '../../lib/fighters-storage';
import { Fighter } from '../../types/fighter';

export default function FighterDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [fighter, setFighter] = useState<Fighter | null>(null);

  const load = useCallback(() => {
    if (!id) {
      return;
    }
    getFighterById(id).then(setFighter);
  }, [id]);

  useFocusEffect(load);

  async function handleDelete() {
    if (!id) {
      return;
    }

    Alert.alert('Delete fighter', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteFighter(id);
          router.replace('/fighters');
        },
      },
    ]);
  }

  if (!fighter) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>Fighter not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.name}>{fighter.name}</Text>
      <Text style={styles.meta}>{fighter.weightClass}</Text>
      <Text style={styles.meta}>{fighter.gym}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Record</Text>
        <Text style={styles.cardValue}>
          {fighter.wins} - {fighter.losses}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notes</Text>
        <Text style={styles.notes}>{fighter.notes || 'No notes yet.'}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => router.push(`/fighters/edit/${fighter.id}`)}>
        <Text style={styles.buttonText}>Edit Fighter</Text>
      </Pressable>
      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Fighter</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  content: { padding: 16, gap: 12 },
  name: { color: '#f8fafc', fontSize: 30, fontWeight: '800' },
  meta: { color: '#94a3b8' },
  card: { backgroundColor: '#1e293b', borderRadius: 12, padding: 14, gap: 6 },
  cardTitle: { color: '#cbd5e1', fontWeight: '700' },
  cardValue: { color: '#e0f2fe', fontSize: 24, fontWeight: '800' },
  notes: { color: '#e2e8f0' },
  button: {
    marginTop: 6,
    borderRadius: 10,
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteButton: {
    borderRadius: 10,
    backgroundColor: '#be123c',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#020617' },
  emptyText: { color: '#94a3b8' },
});
