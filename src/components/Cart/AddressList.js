import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { map } from "lodash";
import colors from "../../styles/colors";

export default function AddressList(props) {
  const { addresses, selectedAddress, setSelectedAddress } = props;

  useEffect(() => {
    addresses && setSelectedAddress(addresses[0]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Direccion de envio:</Text>
      {map(addresses, (address) => (
        <TouchableWithoutFeedback
          key={address._id}
          onPress={() => setSelectedAddress(address)}
        >
          <View
            style={[
              styles.address,
              address._id === selectedAddress?._id && styles.checked,
            ]}
          >
            <Text style={styles.title}>{address.title}</Text>
            <Text>{address.name_lastname}</Text>
            <Text>{address.address}</Text>
            <View style={styles.blockLine}>
              <Text>{address.state}, </Text>
              <Text>{address.city}, </Text>
              <Text>{address.postal_code}</Text>
            </View>
            <Text>{address.country}</Text>
            <Text>Numero de telefono: {address.phone}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  containerTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  blockLine: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  checked: {
    borderColor: colors.primary,
    backgroundColor: "#0098d330",
  },
});
