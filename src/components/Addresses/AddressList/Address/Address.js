import { View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { addressCtrl } from "../../../../api";
import { screensName } from "../../../../utils";
import { styles } from "./Address.styles";

export function Address(props) {
  const { addressId, address, onReload } = props;
  const navigation = useNavigation();

  const goToUpdateAddress = () => {
    navigation.navigate(screensName.account.addEditAddress, {
      addressId,
    });
  };

  const deleteAddressAlert = () => {
    Alert.alert(
      "Eliminar dirección",
      `¿Estas seguro de que quieres eliminar la dirección (${address.title})?`,
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: deleteAddress,
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAddress = async () => {
    try {
      await addressCtrl.delete(addressId);
      onReload();
    } catch (error) {
      Toast.show("Error al eliminar la dirección", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{address.title}</Text>
      <Text>{address.name}</Text>
      <Text>{address.address}</Text>
      <Text>
        {address.state}, {address.city}, {address.postal_code}
      </Text>
      <Text>{address.country}</Text>
      <Text>Numer de telefono: {address.phone}</Text>

      <View style={styles.actions}>
        <Button mode="contained" onPress={goToUpdateAddress}>
          Editar
        </Button>
        <Button mode="contained" onPress={deleteAddressAlert}>
          Eliminar
        </Button>
      </View>
    </View>
  );
}
