import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { map } from "lodash";
import ScreenLoading from "../ScreenLoading";
import Product from "./Product";
import { getProductApi } from "../../api/product";

export default function ProductList(props) {
  const { cart, products, setProducts, setReloadCart, setTotalPayment } = props;

  useEffect(() => {
    (async () => {
      const productTemp = [];
      let totalPaymentTemp = 0;
      for await (const product of cart) {
        const response = await getProductApi(product.idProduct);
        response.quantity = product.quantity;
        productTemp.push(response);

        totalPaymentTemp += response.price * product.quantity;
      }
      setProducts(productTemp);
      setTotalPayment(totalPaymentTemp.toFixed(2));
      setReloadCart(false);
    })();
  }, [cart]);

  return (
    <View>
      <Text style={styles.title}>Productos:</Text>
      {!products ? (
        <ScreenLoading text="Cargando carrito" size="large" />
      ) : (
        map(products, (product) => (
          <Product
            key={product._id}
            product={product}
            setReloadCart={setReloadCart}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
