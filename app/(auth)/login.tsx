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
      <View style={styles.container}>
        <View style={{ height: 30 }} />

        <Image
          source={require("../../assets/images/icon-sin-bg.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={{ height: 30 }} />

        <Text style={styles.title}>Iniciar Sesión</Text>

        <View style={{ height: 30 }} />

        <TextInput
          style={[styles.input, { marginBottom: 20 }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={[styles.input, { marginBottom: 20 }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={{ height: 10 }} />

        <Text style={styles.button} onPress={handleSubmit}>
          Login
        </Text>

        <View style={{ height: 100 }} />

        <Link href="/register" replace>
          <Text style={{ textAlign: "center", color: "#007AFF" }}>
            Register instead
          </Text>
        </Link>
        <View style={{ height: 75 }} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
  },
  input: {
    width: "80%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#333",
    color: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  logo: {
    width: 150,
    height: 150,
  },
});
