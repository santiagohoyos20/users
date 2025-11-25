import { Redirect, Stack } from "expo-router";
import { useUser } from "../../hooks/useUser";

export default function AppLayout() {
  const { user, loading } = useUser();

  if (loading) return null; // pantalla de carga opcional

  if (!user) {
    // Si no hay usuario → mandar al login
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      {/* <Stack.Screen name="profile" /> */}
    </Stack>
  );
}
