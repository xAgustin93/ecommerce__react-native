import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import useAuth from "../../hooks/useAuth";

export default function Actions(props) {
  const { product } = props;
  const { auth } = useAuth();

  return (
    <Button
      mode="contained"
      contentStyle={styles.btnBuyContent}
      labelStyle={styles.btnLabel}
      style={styles.btn}
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
