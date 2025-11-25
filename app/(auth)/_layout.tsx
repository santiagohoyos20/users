import { Stack, Redirect } from "expo-router";
import { useUser } from "../../hooks/useUser";

export default function AuthLayout() {
  const { user, loading } = useUser();

  if (loading) return null; // pantalla de carga opcional

  if (user) {
    // Si hay usuario → redirigimos a la app
    return <Redirect href="/(app)/home" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
