import { SafeAreaProvider } from "react-native-safe-area-context";
import { useUser } from "../../hooks/useUser";
import Main from "../components/Main";

export default function Home() {
  const { user, logout } = useUser();

  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
