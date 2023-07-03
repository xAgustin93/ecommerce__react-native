import { View, Text } from "react-native";
import { styles } from "./Empty.styles";

export function Empty() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No tienes productos en el carrito</Text>
    </View>
  );
}
