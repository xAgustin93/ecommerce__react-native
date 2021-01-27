import React from "react";
import { Text } from "react-native";
import StatusBar from "../components/StatusBar";
import colors from "../styles/colors";

export default function Cart() {
  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <Text>Cart</Text>
    </>
  );
}
