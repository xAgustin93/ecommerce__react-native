import { storageCrtl } from "../api/storage";
import { fn } from "../utils";

export async function authFetch(url, params) {
  const token = await storageCrtl.getToken();

  const logout = async () => {
    await storageCrtl.removeToken();
  };

  if (!token) {
    logout();
  } else {
    if (fn.hasTokenExpired(token)) {
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        return await fetch(url, paramsTemp);
      } catch (error) {
        throw error;
      }
    }
  }
}
