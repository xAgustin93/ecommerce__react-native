import { View, Text } from "react-native";
import { map } from "lodash";
import { Product } from "./Product";
import { styles } from "./ProductList.styles";

export function ProductList(props) {
  const { products } = props;

  return (
    <View>
      <Text style={styles.title}>Products:</Text>

      {map(products, (product) => (
        <Product key={product.id} product={product} />
      ))}
    </View>
  );
}
