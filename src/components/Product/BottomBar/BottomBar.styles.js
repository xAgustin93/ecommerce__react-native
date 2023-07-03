import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    height: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  wishlist: {
    width: "20%",
  },
  buy: {
    width: "80%",
  },
});
