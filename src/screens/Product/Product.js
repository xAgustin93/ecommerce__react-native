import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import StatusBar from "../../components/StatusBar";
import Search from "../../components/Search";
import ScreenLoading from "../../components/ScreenLoading";
import CarouselImages from "../../components/Product/CarouselImages";
import Price from "../../components/Product/Price";
import Quantity from "../../components/Product/Quantity";
import Buy from "../../components/Product/Buy";
import Favorite from "../../components/Product/Favorite";
import { getProductApi } from "../../api/product";
import colors from "../../styles/colors";

export default function Product(props) {
  const { route } = props;
  const { params } = route;
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await getProductApi(params.idProduct);
      setProduct(response);

      const arrayImages = [response.main_image];
      arrayImages.push(...response.images);
      setImages(arrayImages);
    })();
  }, [params]);

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <Search />
      {!product ? (
        <ScreenLoading text="Cargando producto" size="large" />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{product.title}</Text>
          <CarouselImages images={images} />
          <Price price={product.price} discount={product.discount} />
          <Quantity quantity={quantity} setQuantity={setQuantity} />
          <Buy product={product} quantity={quantity} />
          <Favorite product={product} />
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  btnBuyContent: {
    backgroundColor: "#008fe9",
    paddingVertical: 5,
  },
  btnBuyLabel: {
    fontSize: 18,
  },
  btnBuy: {
    marginTop: 20,
  },
});
