import AsyncStorage from "@react-native-async-storage/async-storage";
import { size } from "lodash";
import { ENV, fn } from "../utils";

async function getSearchHistory() {
  try {
    const history = await AsyncStorage.getItem(ENV.STORAGE.SEARCH_HISTORY);
    if (!history) return [];

    return fn.sortArrayByDate(JSON.parse(history));
  } catch (error) {
    return [];
  }
}

async function updateSearchHistory(searchText) {
  const history = await getSearchHistory();

  if (size(history) > 10) {
    history.pop();
  }

  history.push({
    search: searchText,
    date: new Date(),
  });

  await AsyncStorage.setItem(
    ENV.STORAGE.SEARCH_HISTORY,
    JSON.stringify(history)
  );
}

export const searchHistoryCtrl = {
  get: getSearchHistory,
  update: updateSearchHistory,
};
