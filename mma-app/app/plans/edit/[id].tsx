import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PlanForm } from '../../../components/plan-form';
import { getPlanById, updatePlan } from '../../../lib/plans-storage';
import { PlanFormValues } from '../../../lib/validation';
import { Plan } from '../../../types/plan';

export default function EditPlanScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const router = useRouter();

  const load = useCallback(() => {
    if (!id) return;
    getPlanById(id).then(setPlan);
  }, [id]);

  useFocusEffect(load);

  async function submit(values: PlanFormValues) {
    if (!id) return;
    const updated = await updatePlan(id, values);
    if (updated) {
      router.replace(`/plans/${id}`);
    }
  }

  if (!plan) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Loading plan...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Edit Plan</Text>
      <PlanForm
        submitLabel="Save Changes"
        defaultValues={{ title: plan.title, note: plan.note }}
        onSubmit={submit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  content: { padding: 16, gap: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#020617' },
  title: { color: '#f8fafc', fontSize: 28, fontWeight: '800' },
  empty: { color: '#94a3b8' },
});
