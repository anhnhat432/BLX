import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { ExerciseForm } from '../../components/exercise-form';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { addExerciseToPlan, getPlanById, removeExercise } from '../../lib/plans-storage';
import { ExerciseFormValues } from '../../lib/validation';
import { Plan } from '../../types/plan';

export default function PlanDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const router = useRouter();

  const load = useCallback(() => {
    if (!id) return;
    getPlanById(id).then(setPlan);
  }, [id]);

  useFocusEffect(load);

  async function addExercise(values: ExerciseFormValues) {
    if (!id) return;
    await addExerciseToPlan(id, values);
    await load();
  }

  async function remove(exerciseId: string) {
    if (!id) return;
    await removeExercise(id, exerciseId);
    await load();
  }

  if (!plan) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Plan not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>{plan.title}</Text>
        <Text style={styles.note}>{plan.note}</Text>
        <Button label="Edit Plan" onPress={() => router.push(`/plans/edit/${plan.id}`)} variant="secondary" />
      </Card>

      <Text style={styles.section}>Add Exercise</Text>
      <ExerciseForm onSubmit={addExercise} />

      <Text style={styles.section}>Exercises</Text>
      <FlatList
        data={plan.exercises}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No exercises added yet.</Text>}
        renderItem={({ item }) => (
          <Card>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseMeta}>
              {item.sets} sets × {item.reps} reps
            </Text>
            <Button label="Remove" onPress={() => remove(item.id)} variant="danger" />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#020617', gap: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#020617' },
  title: { color: '#f8fafc', fontSize: 26, fontWeight: '800' },
  note: { color: '#cbd5e1' },
  section: { color: '#e2e8f0', fontWeight: '700', fontSize: 18, marginTop: 6 },
  list: { paddingBottom: 20, gap: 10 },
  empty: { color: '#94a3b8', textAlign: 'center' },
  exerciseName: { color: '#e2e8f0', fontWeight: '700', fontSize: 18 },
  exerciseMeta: { color: '#94a3b8' },
});
