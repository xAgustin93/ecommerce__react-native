import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";

export default function UserInfo(props) {
  const { user } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido,</Text>
      <Text style={styles.titleName}>
        {user.name && user.lastname
          ? `${user.name} ${user.lastname}`
          : user.email}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  titleName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
