import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import StatusBar from "../components/StatusBar";
import FinishPurchase from "../components/Cart/FinishPurchase";
import ProductList from "../components/Cart/ProductList";
import { getProductCartApi } from "../api/cart";
import colors from "../styles/colors";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setCart(null);
      loadCart();
    }, [])
  );

  useEffect(() => {
    reloadCart && loadCart();
  }, [reloadCart]);

  const loadCart = async () => {
    const response = await getProductCartApi();
    setCart(response);
  };

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      {!cart || size(cart === 0) ? (
        <View>
          <Text>No tienes productos en el carrito</Text>
        </View>
      ) : (
        <>
          <FinishPurchase />
          <ScrollView style={styles.cartContainer}>
            <ProductList cart={cart} setReloadCart={setReloadCart} />
          </ScrollView>
          {reloadCart && (
            <View style={styles.reload}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.reloadText}>Cargando...</Text>
            </View>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    padding: 10,
  },
  reload: {
    backgroundColor: "#000",
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  reloadText: {
    marginTop: 10,
    color: "#fff",
  },
});
