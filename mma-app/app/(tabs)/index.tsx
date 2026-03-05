import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { deletePlan, getPlans } from '../../lib/plans-storage';
import { Plan } from '../../types/plan';

export default function HomeTab() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const router = useRouter();

  const loadPlans = useCallback(() => {
    getPlans().then(setPlans);
  }, []);

  useFocusEffect(loadPlans);

  async function onDelete(id: string) {
    await deletePlan(id);
    await loadPlans();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Training Plans</Text>
      <Text style={styles.subtitle}>Create and manage MMA class plans with exercises.</Text>

      <FlatList
        data={plans}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No plans yet. Use Create tab.</Text>}
        renderItem={({ item }) => (
          <Card>
            <Text style={styles.planTitle}>{item.title}</Text>
            <Text style={styles.planNote}>{item.note}</Text>
            <Text style={styles.planMeta}>Exercises: {item.exercises.length}</Text>
            <View style={styles.row}>
              <Button label="Open" onPress={() => router.push(`/plans/${item.id}`)} />
              <Button label="Edit" onPress={() => router.push(`/plans/edit/${item.id}`)} variant="secondary" />
              <Button label="Delete" onPress={() => onDelete(item.id)} variant="danger" />
            </View>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#020617' },
  title: { color: '#f8fafc', fontSize: 30, fontWeight: '800' },
  subtitle: { marginTop: 4, color: '#94a3b8' },
  list: { paddingTop: 12, gap: 12, paddingBottom: 20 },
  empty: { color: '#94a3b8', marginTop: 20, textAlign: 'center' },
  planTitle: { color: '#e2e8f0', fontSize: 20, fontWeight: '700' },
  planNote: { color: '#cbd5e1' },
  planMeta: { color: '#94a3b8' },
  row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
});
