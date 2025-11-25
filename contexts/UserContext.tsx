import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const api = axios.create({
  // baseURL: "http://localhost:80", // cambia esto
  // baseURL: "http://192.168.1.45:80", // cambia esto
  baseURL: "https://unchallengeably-overglad-brinda.ngrok-free.dev"
  
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------
  // 🔐 Guardar token
  // ---------------------------------------------------
  async function saveToken(t) {
    setToken(t);
    await AsyncStorage.setItem("token", t);
  }

  async function loadToken() {
    return await AsyncStorage.getItem("token");
  }

  async function clearToken() {
    setToken(null);
    await AsyncStorage.removeItem("token");
  }

  // ---------------------------------------------------
  // 🔐 Login: recibe JWT del backend
  // ---------------------------------------------------
  async function login(email, password) {
    try {
      const res = await api.post("/auth/login", { email, password });

      const { accessToken, userId } = res.data;
      console.log("LOGIN RESPONSE:", res.data);
      await saveToken(accessToken);
      setUser(userId);
    } catch (err) {
      throw Error(err.response?.data?.message || "Login failed");
    }
  }

  // ---------------------------------------------------
  // 🆕 Register
  // ---------------------------------------------------
  async function register({ email, password, firstName, lastName, phone }) {
    try {
      await api.post("/auth/signup", {
        email,
        password,
        id_rol: 2,
        name: firstName,
        lastname: lastName,
        phoneNumber: phone,
      });
      console.log("HERE I AM");
      // Login automático después del registro
      await login(email, password);
    } catch (err) {
      throw Error(err.response?.data?.message || "Register failed");
    }
  }

  // ---------------------------------------------------
  // 🚪 Logout
  // ---------------------------------------------------
  async function logout() {
    await clearToken();
    setUser(null);
  }

  // ---------------------------------------------------
  // 📌 Cargar usuario al abrir la app
  // ---------------------------------------------------
  useEffect(() => {
    async function init() {
      const savedToken = await loadToken();
      if (savedToken) {
        setToken(savedToken);

        try {
          console.log("TOKEN:", savedToken);
          const res = await api.get("/auth/me", {
            headers: { Authorization: `Bearer ${savedToken}` },
          });

          setUser(res.data);
        } catch {
          await logout();
        }
      }
      setLoading(false);
    }

    init();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
