import React, { useState, useEffect, useMemo } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import jwtDecode from "jwt-decode";
import AuthScreen from "./src/screens/AuthScreen";
import UserNavigation from "./src/navigation/UserNavigation";
import { getTokenApi, setTokenApi, removeTokenApi } from "./src/api/token";
import AuthContext from "./src/context/AuthContext";

export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = (user) => {
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: jwtDecode(user.jwt).id,
    });
  };

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser: null,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
        {auth ? <UserNavigation /> : <AuthScreen />}
      </PaperProvider>
    </AuthContext.Provider>
  );
}
