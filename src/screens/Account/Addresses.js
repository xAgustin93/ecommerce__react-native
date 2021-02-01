import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import StatusBar from "../../components/StatusBar";
import AddressList from "../../components/Address/AddressList";
import { getAddressesApi } from "../../api/address";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";

export default function Addresses() {
  const [addresses, setAddresses] = useState(null);
  const [reloadAddress, setReloadAddress] = useState(false);
  const { auth } = useAuth();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setAddresses(null);
      (async () => {
        const response = await getAddressesApi(auth);
        setAddresses(response);
        setReloadAddress(false);
      })();
    }, [reloadAddress])
  );

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Mis direcciones</Text>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("add-address")}
        >
          <View style={styles.addAddress}>
            <Text style={styles.addAddressText}>Añadir una dirección</Text>
            <IconButton icon="arrow-right" color="#000" size={19} />
          </View>
        </TouchableWithoutFeedback>

        {!addresses ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : size(addresses) === 0 ? (
          <Text style={styles.noAddressText}>Crea tu primera dirección</Text>
        ) : (
          <AddressList
            addresses={addresses}
            setReloadAddress={setReloadAddress}
          />
        )}
      </ScrollView>
    </>
  );
}

var styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  addAddress: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addAddressText: {
    fontSize: 16,
  },
  noAddressText: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 18,
  },
  loading: {
    marginTop: 20,
  },
});
