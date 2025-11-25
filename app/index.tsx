import { Redirect } from "expo-router";
import { useUser } from "../hooks/useUser";


export default function Index() {
  const { user } = useUser();

  // if (!user) {
  //   return <Redirect href="/login" />;
  // }

  return <Redirect href="/home" />;
}
