import { View, Text } from "react-native";
import { styles } from "./ResultNotFound.styles";

export function ResultNotFound(props) {
  const { searchText } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>No hay reusltados para {searchText}</Text>
      <Text style={styles.otherText}>
        Revisa la ortigrafía o usa términos más generales.
      </Text>
    </View>
  );
}
