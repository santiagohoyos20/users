import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "../../hooks/useUser";
import MapView from "./MapView";

export default function Main() {
  const { user, logout } = useUser();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
      ]}
    >
      <MapView />
      <View style={styles.footer}>
        <Text style={styles.title}>Ruta 101</Text>
        <Pressable onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    height: "100%",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 30,
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
