import AsyncStorage from "@react-native-async-storage/async-storage";
import { size } from "lodash";
import { SEARCH_HISTORY } from "../utils/constants";
import { sortArrayByDate } from "../utils/functions";

export async function getSearchHistory() {
  try {
    const history = await AsyncStorage.getItem(SEARCH_HISTORY);
    if (!history) return [];

    return sortArrayByDate(JSON.parse(history));
  } catch (e) {
    return [];
  }
}

export async function updateSearchHistory(search) {
  const history = await getSearchHistory();

  if (size(history) > 5) history.pop();

  history.push({
    search,
    date: new Date(),
  });
  await AsyncStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
}
