import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#16222b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  backArrow: {
    position: "absolute",
    left: 0,
    top: 15,
    color: "#fff",
  },
  containerInput: {
    position: "relative",
    alignItems: "flex-end",
  },
  searchBar: {
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
