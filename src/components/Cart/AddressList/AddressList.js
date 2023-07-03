import { View, Text } from "react-native";
import { map } from "lodash";
import { Address } from "./Address";
import { styles } from "./AddressList.styles";

export function AddressList(props) {
  const { addresses, selectedAddress, setSelectedAddress } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Direccion de envio:</Text>

      {map(addresses, (address) => (
        <Address
          key={address.id}
          address={address}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      ))}
    </View>
  );
}
