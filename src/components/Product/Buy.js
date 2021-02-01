import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";
import { addProductCartApi } from "../../api/cart";

export default function Actions(props) {
  const { product, quantity } = props;

  const addProductCart = async () => {
    const response = await addProductCartApi(product._id, quantity);
    if (response) {
      Toast.show("Producto añadido al carrito", {
        position: Toast.positions.CENTER,
      });
    } else {
      Toast.show("ERROR al añadir el producto al carrito", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <Button
      mode="contained"
      contentStyle={styles.btnBuyContent}
      labelStyle={styles.btnLabel}
      style={styles.btn}
      onPress={addProductCart}
    >
      Añadir a la cesta
    </Button>
  );
}

const styles = StyleSheet.create({
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
  },
  btnBuyContent: {
    backgroundColor: "#008fe9",
    paddingVertical: 5,
  },
});
