import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { size } from "lodash";
import useAuth from "../../hooks/useAuth";
import {
  addFavoriteApi,
  isFavoriteApi,
  deleteFavoriteApi,
} from "../../api/favorite";

export default function Actions(props) {
  const { product } = props;
  const { auth } = useAuth();
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [reloadFavorite, setReloadFavorite] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth, product._id);
      if (size(response) === 0) setIsFavorite(false);
      else setIsFavorite(true);

      setReloadFavorite(false);
      setLoading(false);
    })();
  }, [product, reloadFavorite]);

  const addFavorite = async () => {
    if (!loading) {
      setLoading(true);
      await addFavoriteApi(auth, product._id);
      setReloadFavorite(true);
    }
  };

  const deleteFavorite = async () => {
    if (!loading) {
      setLoading(true);
      await deleteFavoriteApi(auth, product._id);
      setReloadFavorite(true);
    }
  };

  if (isFavorite === undefined) return null;

  return (
    <Button
      mode="contained"
      contentStyle={
        isFavorite
          ? styles.btnDeleteFavoritesContent
          : styles.btnAddFavoritesContent
      }
      labelStyle={styles.btnLabel}
      style={styles.btn}
      onPress={isFavorite ? deleteFavorite : addFavorite}
      loading={loading}
    >
      {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
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
  btnAddFavoritesContent: {
    backgroundColor: "#057b00",
    paddingVertical: 5,
  },
  btnDeleteFavoritesContent: {
    backgroundColor: "#c40000",
    paddingVertical: 5,
  },
});
