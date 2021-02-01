import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { map } from "lodash";
import ScreenLoading from "../ScreenLoading";
import Product from "./Product";
import { getProductApi } from "../../api/product";

export default function ProductList(props) {
  const { cart, setReloadCart } = props;
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      const productTemp = [];
      for await (const product of cart) {
        const response = await getProductApi(product.idProduct);
        response.quantity = product.quantity;
        productTemp.push(response);
      }
      setProducts(productTemp);
      setReloadCart(false);
    })();
  }, [cart]);

  return (
    <View>
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
