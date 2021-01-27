import React from "react";
import { Text } from "react-native";
import StatusBar from "../components/StatusBar";
import colors from "../styles/colors";

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <Text>HOME</Text>
    </>
  );
}
