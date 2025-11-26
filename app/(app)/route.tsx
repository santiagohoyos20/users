import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "../../hooks/useUser";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "../components/MapView";

export default function Route() {
  const { user, logout } = useUser();
  const insets = useSafeAreaInsets();
  const { id, name, description } = useLocalSearchParams();
  console.log("Route params:", { id, name, description });

  return (
    
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <MapView />
      <ScrollView
        style={styles.footer}
        contentContainerStyle={styles.footerContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.footer}>
          <Text style={styles.title}>Sobusa C14 - K-54 Uninorte</Text>
          <Text>
            Soledad: La Central, Villas del Portal, Los Loteros, El Manantial,
            Terranova 2, Nuevo Milenio, Villa Estadio, Las Moras, Las
            Trinitarias, El Parque. {"\n"}{"\n"} 
            Barranquilla: Simón Bolívar, La Chinita, La
            Luz, Rebolo, Centro, El Rosario, Modelo, El Prado, Bellavista, Altos
            del Prado, Santa Mónica, Altos del Limón, Villa Santos, Villa
            Campestre, Villa Norte, Villa Mar, Urbaplaya, Adelita de Char.
          </Text>
        </View>
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFECE0",
    height: "100%",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },
  footer: {
    width: "100%",
    maxHeight: 170,
  },
  footerContent: {
    paddingHorizontal: 20,
    paddingVertical: 30
  },


});
