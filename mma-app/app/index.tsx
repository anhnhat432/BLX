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
