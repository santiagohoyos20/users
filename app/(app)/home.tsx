import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  { id: 3, 
    name: "Ruta Sur", 
    description: "Descubre el sur y sus atractivos" },
];

export default function Home() {
  const router = useRouter();
  const { logout } = useUser();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFECE0" }}>
      <ScrollView contentContainerStyle={styles.container}>


      
        <Image
          source={require("../../assets/images/icon-sin-bg.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      
        <Text style={styles.title}>Selecciona una Ruta</Text>

        <View style={styles.card}>
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
              <Text style={styles.routeDescription}>
                {route.description}
              </Text>
            </Pressable>
          ))}

          <Pressable
            onPress={logout}
            style={({ pressed }) => [
              styles.logoutButton,
              { backgroundColor: pressed ? "#D62828" : "#FFCC00" },
            ]}
          >
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  logo: {
    width: 60,
    height: 60,
    position: "absolute",
    top: 20,
    right: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    marginTop: 25,
  },

  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 60,
  },

  routeCard: {
    backgroundColor: "#FAFAFA",
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1.2,
    borderColor: "#e6e6e6",
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  routeName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },

  routeDescription: {
    fontSize: 14,
    color: "#666",
  },

  logoutButton: {
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
