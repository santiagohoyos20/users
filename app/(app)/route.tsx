import { useLocalSearchParams } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useUser } from "../../hooks/useUser";
import Main from "../components/Main";

export default function Home() {
  const { user, logout } = useUser();
  const { id, name, description } = useLocalSearchParams();
  console.log("Route params:", { id, name, description });
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
