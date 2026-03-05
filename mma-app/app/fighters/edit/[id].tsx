import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { FighterForm } from '../../../components/fighter-form';
import { getFighterById, updateFighter } from '../../../lib/fighters-storage';
import { Fighter, FighterInput } from '../../../types/fighter';

export default function EditFighterScreen() {
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

  async function handleUpdate(values: FighterInput) {
    if (!id) {
      return;
    }

    const updated = await updateFighter(id, values);
    if (updated) {
      router.replace(`/fighters/${id}`);
    }
  }

  if (!fighter) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>Loading fighter...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Edit Fighter</Text>
      <FighterForm initial={fighter} submitLabel="Save Changes" onSubmit={handleUpdate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  content: { padding: 16, gap: 12 },
  title: { color: '#f8fafc', fontWeight: '800', fontSize: 26 },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#020617' },
  emptyText: { color: '#94a3b8' },
});
