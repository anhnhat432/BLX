import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#020617' },
        headerTintColor: '#f8fafc',
        contentStyle: { backgroundColor: '#020617' },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="plans/[id]" options={{ title: 'Plan Details' }} />
      <Stack.Screen name="plans/edit/[id]" options={{ title: 'Edit Plan' }} />
    </Stack>
  );
}
