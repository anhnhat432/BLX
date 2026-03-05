import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { FighterForm } from '../../components/fighter-form';
import { createFighter } from '../../lib/fighters-storage';
import { FighterInput } from '../../types/fighter';

export default function AddFighterScreen() {
  const router = useRouter();

  async function handleCreate(values: FighterInput) {
    const fighter = await createFighter(values);
    router.replace(`/fighters/${fighter.id}`);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Add Fighter</Text>
      <FighterForm submitLabel="Create Fighter" onSubmit={handleCreate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  content: { padding: 16, gap: 12 },
  title: { color: '#f8fafc', fontWeight: '800', fontSize: 26 },
});
