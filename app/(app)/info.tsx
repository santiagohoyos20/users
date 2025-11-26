import { View, Text, StyleSheet } from "react-native";

export default function Info() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información</Text>
      <Text style={styles.text}>
        Aquí puedes colocar información sobre la app, rutas, créditos, etc.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFECE0",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
  },
});
