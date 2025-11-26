import { Link } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Pressable
} from "react-native";
import { useUser } from "../../hooks/useUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();

  const handleSubmit = async () => {
    await login(email, password);
  };

  return (
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

        {/* Tarjeta */}
        <View style={styles.card}>
          <Text style={styles.title}>Inicio de Sesión</Text>

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
              { backgroundColor: pressed ? "#D62828" : "#FFCC00" }
            ]}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </Pressable>

          <View style={{ height: 20 }} />

          <Link href="/register" replace>
            <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
          </Link>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffece0ff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 35,
  },

  card: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
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
    color: "#000000ff",
  },

  button: {
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
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
  },
});
