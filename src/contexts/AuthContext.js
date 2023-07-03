import { useState, useEffect, createContext } from "react";
import { storageCrtl, userCtrl } from "../api";
import { fn } from "../utils";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveSession();
  }, []);

  const retrieveSession = async () => {
    const token = await storageCrtl.getToken();

    if (!token) {
      logout();
      setLoading(false);
      return;
    }

    if (fn.hasTokenExpired(token)) {
      logout();
    } else {
      await login(token);
    }
  };

  const login = async (token) => {
    try {
      await storageCrtl.setToken(token);
      const response = await userCtrl.getMe();
      setUser(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const logout = async () => {
    await storageCrtl.removeToken();
    setUser(null);
  };

  const updateUser = (key, value) => {
    setUser((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const data = {
    user,
    login,
    logout,
    updateUser,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
