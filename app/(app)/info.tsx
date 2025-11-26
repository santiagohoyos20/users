import { View, Text, StyleSheet } from "react-native";
import { Linking } from "react-native";

export default function Info() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información</Text>
      <Text style={styles.text}>
        Aplicación desarrollada por:{"\n"}{"\n"}
        
        - Santiago Hoyoz{"\n"}
        - Jesús Cabrera{"\n"}
        - Laureano Lafaurie{"\n"}
      </Text>

      <Text
        style={styles.link}
        onPress={() => Linking.openURL("https://github.com/santiagohoyos20/transporte-publico-inteligente.git")}
        >
        github del proyecto

        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    link: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
    marginBottom: 8,
    },
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
