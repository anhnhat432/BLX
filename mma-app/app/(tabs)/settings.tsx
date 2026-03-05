import { StyleSheet, Text, View } from 'react-native';

import { Card } from '../../components/ui/card';

export default function SettingsTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Card>
        <Text style={styles.label}>Course mode</Text>
        <Text style={styles.value}>Student-friendly UI and local storage only.</Text>
      </Card>
      <Card>
        <Text style={styles.label}>Validation</Text>
        <Text style={styles.value}>React Hook Form + Zod enabled for forms.</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, backgroundColor: '#020617' },
  title: { color: '#f8fafc', fontSize: 30, fontWeight: '800' },
  label: { color: '#cbd5e1', fontWeight: '700' },
  value: { color: '#94a3b8' },
});
