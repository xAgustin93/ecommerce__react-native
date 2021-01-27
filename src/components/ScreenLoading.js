import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";

export default function ScreenLoading(props) {
  const { text, size, color } = props;

  return (
    <SafeAreaView style={styles.containerLoading}>
      <ActivityIndicator size={size} color={color} style={styles.loading} />
      <Text style={styles.title}>{text}</Text>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
});

ScreenLoading.defaultProps = {
  text: "Cargando...",
  color: "#000",
};
