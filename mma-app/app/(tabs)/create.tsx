import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { PlanForm } from '../../components/plan-form';
import { createPlan } from '../../lib/plans-storage';
import { PlanFormValues } from '../../lib/validation';

export default function CreateTab() {
  const router = useRouter();

  async function submit(values: PlanFormValues) {
    const plan = await createPlan(values);
    router.replace(`/plans/${plan.id}`);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Create Plan</Text>
      <Text style={styles.subtitle}>Title and note are required.</Text>
      <PlanForm submitLabel="Create Plan" onSubmit={submit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  content: { padding: 16, gap: 12 },
  title: { color: '#f8fafc', fontSize: 30, fontWeight: '800' },
  subtitle: { color: '#94a3b8' },
});
