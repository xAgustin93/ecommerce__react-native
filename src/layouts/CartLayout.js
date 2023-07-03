import { ScrollView } from "react-native";
import { StatusBar } from "../components/Shared";

export function CartLayout(props) {
  const { children } = props;

  return (
    <>
      <StatusBar backgroundColor="#16222b" barStyle="light-content" />
      <ScrollView>{children}</ScrollView>
    </>
  );
}
