import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import colors from "../../styles/colors";

export default function FinishPurchase(props) {
  const {} = props;

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        contentStyle={styles.btnContent}
        labelStyle={styles.btnText}
      >
        Comprar ahora
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#dadde1",
  },
  btnContent: {
    paddingVertical: 4,
    backgroundColor: colors.primary,
  },
  btnText: {
    fontSize: 16,
  },
});
