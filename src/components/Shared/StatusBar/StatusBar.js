import { StatusBar as StatusBarRN, SafeAreaView } from "react-native";
import { styled } from "./StatusBar.styles";

export function StatusBar(props) {
  const { backgroundColor, ...rest } = props;
  const styles = styled(backgroundColor);

  return (
    <>
      <StatusBarRN backgroundColor={backgroundColor} {...rest} />
      <SafeAreaView style={styles.safeAreaView} />
    </>
  );
}
