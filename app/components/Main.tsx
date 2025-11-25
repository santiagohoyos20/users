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
        { flex: 1, paddingTop: insets.top, alignItems: "center" },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>

        <Pressable onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
      <MapView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    paddingBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
    paddingBottom: 20,
  },
  header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 10,
  width: "90%",
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
