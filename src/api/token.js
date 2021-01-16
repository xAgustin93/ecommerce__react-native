import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getTokenApi() {
  try {
    const token = await AsyncStorage.getItem("TOKEN");
    return token;
  } catch (e) {
    return null;
  }
}
