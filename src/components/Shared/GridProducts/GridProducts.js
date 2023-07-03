import { View, Text } from "react-native";
import { map } from "lodash";
import { Product } from "./Product";
import { styles } from "./GridProducts.styles";

export function GridProducts(props) {
  const { title, products } = props;

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.gridContainer}>
        {map(products, (item) => {
          const product = item.attributes;
          product.id = item.id;

          return <Product key={product.id} product={product} />;
        })}
      </View>
    </View>
  );
}
