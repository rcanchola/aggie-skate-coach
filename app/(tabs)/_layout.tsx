// app/_layout.js
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // hides the top bar globally
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="skate-spots" />
      <Stack.Screen name="game" />
      <Stack.Screen name="tab-two" />
    </Stack>
  );
}
