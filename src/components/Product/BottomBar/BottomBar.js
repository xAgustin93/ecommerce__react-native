import { View, Text } from "react-native";
import { Favorite } from "./Favorite";
import { Buy } from "./Buy";
import { styles } from "./BottomBar.styles";

export function BottomBar(props) {
  const { productId } = props;

  return (
    <View style={styles.container}>
      <View style={styles.wishlist}>
        <Favorite productId={productId} />
      </View>
      <View style={styles.buy}>
        <Buy productId={productId} />
      </View>
    </View>
  );
}
