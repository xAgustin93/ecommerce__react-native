import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screensName } from "../../../../utils";
import { styles } from "./Product.styles";

export function Product(props) {
  const { product } = props;
  const navigation = useNavigation();
  const mainImage = product.main_image.data.attributes.url;

  const goToProduct = () => {
    navigation.navigate(screensName.home.product, { productId: product.id });
  };

  return (
    <TouchableWithoutFeedback onPress={goToProduct}>
      <View style={styles.container}>
        <View style={styles.product}>
          <Image source={{ uri: mainImage }} style={styles.image} />
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {product.title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
