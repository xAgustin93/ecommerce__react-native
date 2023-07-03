import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { size, map } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { productCtrl, addressCtrl } from "../../../api";
import { useCart, useAuth } from "../../../hooks";
import { Layout } from "../../../layouts";
import { LoadingScreen, Search } from "../../../components/Shared";
import { Cart } from "../../../components/Cart";
import { fn } from "../../../utils";
import { styles } from "./CartScreen.styles";

export function CartScreen() {
  const [products, setProducts] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { user } = useAuth();
  const { cart } = useCart();

  useEffect(() => {
    getProducts();
  }, [cart]);

  useEffect(() => {
    loadAddresses();
  }, []);

  const getProducts = async () => {
    const productsTemp = [];
    let totalPaymentTemp = 0;

    for await (const item of cart) {
      const response = await productCtrl.getById(item.id);
      const data = response.data.attributes;

      productsTemp.push({ ...data, ...item });

      const priceProduct = fn.calcPrice(data.price, data.discount);
      totalPaymentTemp += priceProduct * item.quantity;
    }

    setProducts(productsTemp);
    setTotalPayment(totalPaymentTemp);
  };

  const loadAddresses = async () => {
    const response = await addressCtrl.getAll(user.id);
    setAddresses(response.data);
  };

  return (
    <Layout.Cart>
      {!products ? (
        <LoadingScreen text="Cargando carrito" />
      ) : size(products) === 0 ? (
        <>
          <Search.Input />
          <Cart.Empty />
        </>
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <View style={styles.container}>
            <Cart.ProductList products={products} />
            <Cart.AddressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            {selectedAddress && (
              <Cart.Payment
                totalPayment={totalPayment}
                selectedAddress={selectedAddress}
                products={products}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      )}
    </Layout.Cart>
  );
}
