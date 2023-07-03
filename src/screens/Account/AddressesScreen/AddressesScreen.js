import { useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { size } from "lodash";
import { addressCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { screensName } from "../../../utils";
import { AddressList } from "../../../components/Addresses";
import { styles } from "./AddressesScreen.styles";

export function AddressesScreen() {
  const [addresses, setAddresses] = useState(null);
  const [reload, setReload] = useState(false);
  const { user } = useAuth();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      retriveAddresses();
    }, [reload])
  );

  const onReload = () => setReload((prevState) => !prevState);

  const retriveAddresses = async () => {
    const response = await addressCtrl.getAll(user.id);
    setAddresses(response?.data || []);
  };

  const goToAddAddress = () => {
    navigation.navigate(screensName.account.addEditAddress);
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={goToAddAddress}>
        <View style={styles.addAddress}>
          <Text style={styles.addAdressText}>Añadir una dirección</Text>
          <IconButton icon="arrow-right" color="#000" size={19} />
        </View>
      </Pressable>

      {!addresses ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : size(addresses) === 0 ? (
        <Text style={styles.noAddressText}>Crea tu primeta dirección</Text>
      ) : (
        <AddressList addresses={addresses} onReload={onReload} />
      )}
    </ScrollView>
  );
}
