import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AuthScreen from "./src/screens/AuthScreen";
import UserNavigation from "./src/navigation/UserNavigation";
import { getTokenApi } from "./src/api/token";

export default function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    (async () => {
      setAuth(await getTokenApi());
    })();
  }, []);

  return (
    <PaperProvider>{auth ? <UserNavigation /> : <AuthScreen />}</PaperProvider>
  );
}
