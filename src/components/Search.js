import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "../styles/colors";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Busca tu producto"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgDark,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
