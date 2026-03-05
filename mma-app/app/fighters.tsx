import { Stack } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const FIGHTERS = [
  'Georges St-Pierre',
  'Amanda Nunes',
  'Jon Jones',
  'Demetrious Johnson',
  'Valentina Shevchenko',
];

export default function FightersScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Top Fighters', headerShown: true }} />
      <FlatList
        data={FIGHTERS}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <Text style={styles.fighter}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  list: {
    padding: 20,
    gap: 12,
  },
  fighter: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    fontSize: 17,
  },
});
