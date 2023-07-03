import { StyleSheet } from "react-native";

export const styled = (backgroundColor) => {
  return StyleSheet.create({
    safeAreaView: {
      flex: 0,
      backgroundColor: backgroundColor,
    },
  });
};
