import { Link, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { deleteFighter, getFighters } from '../../lib/fighters-storage';
import { Fighter } from '../../types/fighter';

export default function FightersListScreen() {
  const [fighters, setFighters] = useState<Fighter[]>([]);
  const router = useRouter();

  const load = useCallback(() => {
    getFighters().then(setFighters);
  }, []);

  useFocusEffect(load);

  function handleDelete(id: string) {
    Alert.alert('Delete fighter', 'Are you sure you want to remove this fighter?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteFighter(id);
          load();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Fighters</Text>
        <Pressable style={styles.addButton} onPress={() => router.push('/fighters/new')}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={fighters}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No fighters yet. Add your first one.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Link href={`/fighters/${item.id}` as const} style={styles.name}>
              {item.name}
            </Link>
            <Text style={styles.meta}>
              {item.weightClass} • {item.gym}
            </Text>
            <Text style={styles.record}>
              Record: {item.wins}-{item.losses}
            </Text>

            <View style={styles.actions}>
              <Pressable style={styles.smallButton} onPress={() => router.push(`/fighters/edit/${item.id}`)}>
                <Text style={styles.smallButtonText}>Edit</Text>
              </Pressable>
              <Pressable style={styles.smallDangerButton} onPress={() => handleDelete(item.id)}>
                <Text style={styles.smallButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#020617' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#f8fafc', fontSize: 28, fontWeight: '800' },
  addButton: {
    backgroundColor: '#0284c7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButtonText: { color: '#f0f9ff', fontWeight: '700' },
  list: { paddingTop: 14, gap: 12 },
  empty: { marginTop: 30, textAlign: 'center', color: '#94a3b8' },
  card: {
    borderRadius: 12,
    backgroundColor: '#1e293b',
    padding: 14,
    gap: 6,
  },
  name: { color: '#e0f2fe', fontWeight: '700', fontSize: 18 },
  meta: { color: '#cbd5e1' },
  record: { color: '#94a3b8' },
  actions: { marginTop: 8, flexDirection: 'row', gap: 8 },
  smallButton: {
    borderRadius: 8,
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  smallDangerButton: {
    borderRadius: 8,
    backgroundColor: '#be123c',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  smallButtonText: { color: '#fff', fontWeight: '700' },
});
