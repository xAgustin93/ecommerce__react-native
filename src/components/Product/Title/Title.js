import { View, Text } from "react-native";
import { styles } from "./Title.styles";

export function Title(props) {
  const { text } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
}
