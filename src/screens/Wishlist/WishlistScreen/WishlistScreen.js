import { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { forEach, size } from "lodash";
import { wishlistCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { Layout } from "../../../layouts";
import { LoadingScreen } from "../../../components/Shared";
import { WishlistList } from "../../../components/Wishlist";
import { styles } from "./WishlistScreen.styles";

export function WishlistScreen() {
  const [products, setProducts] = useState(null);
  const [reload, setReload] = useState(false);
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      getProductsWishlist();
    }, [reload])
  );

  const onReload = () => setReload((prevState) => !prevState);

  const getProductsWishlist = async () => {
    try {
      const response = await wishlistCtrl.getAllProducts(user.id);
      const productTemp = [];

      forEach(response.data, (item) => {
        productTemp.push(item.attributes.product);
      });
      setProducts(productTemp);
    } catch (error) {
      Toast.show("Error al obtener la lista de deseos", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <Layout.Basic>
      {!products ? (
        <LoadingScreen text="Cargando lista" />
      ) : size(products) === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Lista de deseos</Text>
          <Text>No tienes ningun producto en tu lista</Text>
        </View>
      ) : (
        <WishlistList
          title="Lista de deseos"
          products={products}
          onReload={onReload}
        />
      )}
    </Layout.Basic>
  );
}
