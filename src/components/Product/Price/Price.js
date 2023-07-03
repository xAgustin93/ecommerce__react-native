import { View, Text } from "react-native";
import { fn } from "../../../utils";
import { styles } from "./Price.styles";

export function Price(props) {
  const { price, discount } = props;

  return (
    <View>
      {discount && (
        <View style={styles.containerData}>
          <Text style={styles.dataText}>Precio recomendado:</Text>
          <Text style={[styles.dataValue, styles.oldPrice]}>{price}€</Text>
        </View>
      )}

      <View style={styles.containerData}>
        <Text style={styles.dataText}>Precio:</Text>
        <Text style={[styles.dataValue, styles.currentPrice]}>
          {fn.calcPrice(price, discount)}€
        </Text>
      </View>

      {discount && (
        <View style={styles.containerData}>
          <Text style={styles.dataText}>Ahorras:</Text>
          <Text style={[styles.dataValue, styles.saving]}>
            {((price * discount) / 100).toFixed(2)}€ (-{discount}%)
          </Text>
        </View>
      )}
    </View>
  );
}
