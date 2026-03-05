import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(tabs)" />;
}
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getFighters } from '../lib/fighters-storage';

export default function HomeScreen() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      getFighters().then((fighters) => setCount(fighters.length));
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MMA Course App</Text>
      <Text style={styles.subtitle}>A simple CRUD + AsyncStorage project for students.</Text>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Saved fighters</Text>
        <Text style={styles.cardValue}>{count}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => router.push('/fighters')}>
        <Text style={styles.buttonText}>Open Fighters List</Text>
      </Pressable>

      <Pressable style={styles.ghostButton} onPress={() => router.push('/fighters/new')}>
        <Text style={styles.ghostButtonText}>Add New Fighter</Text>
      </Pressable>
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MMA App</Text>
      <Text style={styles.subtitle}>Built with Expo Router + TypeScript</Text>
      <Link href="/fighters" style={styles.link}>
        View Fighters
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#020617',
  },
  title: {
    color: '#f8fafc',
    fontWeight: '800',
    fontSize: 30,
  },
  subtitle: {
    marginTop: 6,
    color: '#94a3b8',
    fontSize: 15,
  },
  card: {
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: '#1e293b',
    padding: 18,
  },
  cardLabel: {
    color: '#cbd5e1',
  },
  cardValue: {
    marginTop: 8,
    color: '#e0f2fe',
    fontSize: 28,
    fontWeight: '700',
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#f0f9ff',
    fontWeight: '700',
  },
  ghostButton: {
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#0284c7',
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ghostButtonText: {
    color: '#7dd3fc',
    fontWeight: '700',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#f8fafc',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#94a3b8',
  },
  link: {
    marginTop: 24,
    fontSize: 18,
    color: '#38bdf8',
    fontWeight: '600',
  },
});
