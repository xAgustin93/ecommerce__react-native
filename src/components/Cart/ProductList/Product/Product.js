import { View, Text, Image, TextInput } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useCart } from "../../../../hooks";
import { fn } from "../../../../utils";
import { styles } from "./Product.styles";

export function Product(props) {
  const { product } = props;
  const { deleteProduct, increaseProduct, decreaseProduct } = useCart();

  const mainImagen = product.main_image.data.attributes.url;

  const onDeleteProduct = () => deleteProduct(product.id);
  const onIncreaseProduct = () => increaseProduct(product.id);
  const onDecreaseProduct = () => decreaseProduct(product.id);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: mainImagen }} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {product.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              {fn.calcPrice(product.price, product.discount)}€ / unidad
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <View style={styles.selectQuantity}>
            <IconButton
              icon="plus"
              iconColor="#fff"
              size={19}
              style={styles.btnQuantity}
              onPress={onIncreaseProduct}
            />
            <TextInput
              value={product.quantity.toString()}
              style={styles.inputQuantity}
            />
            <IconButton
              icon="minus"
              iconColor="#fff"
              size={19}
              style={styles.btnQuantity}
              onPress={onDecreaseProduct}
            />
          </View>

          <Button
            mode="contained"
            style={styles.btnDelete}
            onPress={onDeleteProduct}
          >
            Eliminar
          </Button>
        </View>
      </View>
    </View>
  );
}
