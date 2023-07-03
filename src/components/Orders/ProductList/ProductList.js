import { View, Text, Image } from "react-native";
import { map } from "lodash";
import { fn } from "../../../utils";
import { styles } from "./ProductList.styles";

export function ProductList(props) {
  const { products } = props;

  return map(products, (product) => (
    <View key={product.id} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.main_image.data.attributes.url }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
          {product.title}
        </Text>
        <View style={styles.price}>
          <Text style={styles.currentPrice}>
            {fn.calcPrice(product.price, product.discount)}€{" x "}
            {product.quantity}
          </Text>
        </View>
      </View>
    </View>
  ));
}
