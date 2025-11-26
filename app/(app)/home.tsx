import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useUser } from "../../hooks/useUser";

const ROUTES = [
  {
    id: 1,
    name: "Ruta Norte",
    description: "Recorrido por la zona norte de la ciudad",
  },
  {
    id: 2,
    name: "Ruta Centro",
    description: "Exploración del centro histórico",
  },
  { id: 3, name: "Ruta Sur", description: "Descubre el sur y sus atractivos" },
];

export default function Home() {
  const router = useRouter();
  const { logout } = useUser();

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona una Ruta</Text>

        {ROUTES.map((route) => (
          <Pressable
            key={route.id}
            style={({ pressed }) => [
              styles.routeCard,
              pressed && styles.pressed,
            ]}
            onPress={() =>
              router.push({
                pathname: "/route",
                params: {
                  id: route.id,
                  name: route.name,
                  description: route.description,
                },
              })
            }
          >
            <Text style={styles.routeName}>{route.name}</Text>
            <Text style={styles.routeDescription}>{route.description}</Text>
          </Pressable>
        ))}
        <Pressable onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
  routeCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  routeName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  routeDescription: {
    fontSize: 14,
    color: "#666",
  },
    logoutButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
