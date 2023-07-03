import AsyncStorage from "@react-native-async-storage/async-storage";
import { ENV } from "../utils";

async function setToken(token) {
  await AsyncStorage.setItem(ENV.STORAGE.TOKEN, token);
}

async function getToken() {
  return await AsyncStorage.getItem(ENV.STORAGE.TOKEN);
}

async function removeToken() {
  await AsyncStorage.removeItem(ENV.STORAGE.TOKEN);
}

export const storageCrtl = {
  setToken,
  getToken,
  removeToken,
};
