import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../hooks/useUser";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const { register } = useUser();

  const handleSubmit = async () => {
    await register({ email, password, firstName, lastName, phone });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFECE0" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback
          onPress={Platform.OS !== "web" ? Keyboard.dismiss : undefined}
        >
          <View style={styles.screen}>
            {/* Logo */}
            <Image
              source={require("../../assets/images/icon-sin-bg.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Card */}
            <View style={styles.card}>
              <Text style={styles.title}>Registra tu Cuenta</Text>

              <TextInput
                style={styles.input}
                placeholder="Nombres"
                placeholderTextColor="#888"
                value={firstName}
                onChangeText={setFirstName}
              />

              <TextInput
                style={styles.input}
                placeholder="Apellidos"
                placeholderTextColor="#888"
                value={lastName}
                onChangeText={setLastName}
              />

              <TextInput
                style={styles.input}
                placeholder="Teléfono"
                placeholderTextColor="#888"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  styles.button,
                  { backgroundColor: pressed ? "#D62828" : "#FFCC00" },
                ]}
              >
                <Text style={styles.buttonText}>Registrarse</Text>
              </Pressable>

              <Link href="/login" replace>
                <Text style={styles.registerText}>
                  ¿Ya tienes cuenta? Inicia sesión
                </Text>
              </Link>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffece0ff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 10,
    marginTop: 25,
  },

  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 30,
  },

  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 25,
    color: "#333",
  },

  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#FAFAFA",
    color: "#333",
  },

  button: {
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 13,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  registerText: {
    textAlign: "center",
    color: "#007AFF",
    marginBottom: -10,
  },
});
