import React from "react";
import { StyleSheet, ScrollView, View, Text, Image } from "react-native";
import { map } from "lodash";
import Product from "./Product";

export default function FavoriteList(props) {
  const { products, auth, setReloadFavorite } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de favoritos</Text>
      {map(products, (item) => (
        <Product
          key={item._id}
          item={item}
          auth={auth}
          setReloadFavorite={setReloadFavorite}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
});
