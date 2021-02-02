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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StatusBar from "../components/StatusBar";
import NotProducts from "../components/Cart/NotProducts";
import ProductList from "../components/Cart/ProductList";
import AddressList from "../components/Cart/AddressList";
import Payment from "../components/Cart/Payment";
import { getProductCartApi } from "../api/cart";
import { getAddressesApi } from "../api/address";
import useAuth from "../hooks/useAuth";
import colors from "../styles/colors";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [totalPayment, setTotalPayment] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      setCart(null);
      loadCart();
      loadAddresses();
    }, [])
  );

  useEffect(() => {
    reloadCart && loadCart();
  }, [reloadCart]);

  const loadCart = async () => {
    const response = await getProductCartApi();
    setCart(response);
  };

  const loadAddresses = async () => {
    const response = await getAddressesApi(auth);
    setAddresses(response);
  };

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      {!cart || size(cart) === 0 ? (
        <NotProducts />
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <ScrollView style={styles.cartContainer}>
            <ProductList
              cart={cart}
              products={products}
              setProducts={setProducts}
              setReloadCart={setReloadCart}
              setTotalPayment={setTotalPayment}
            />
            <AddressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <Payment
              totalPayment={totalPayment}
              selectedAddress={selectedAddress}
              products={products}
            />
          </ScrollView>
          {reloadCart && (
            <View style={styles.reload}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.reloadText}>Cargando...</Text>
            </View>
          )}
        </KeyboardAwareScrollView>
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
