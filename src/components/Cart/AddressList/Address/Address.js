import { View, Text, Pressable } from "react-native";
import { styles } from "./Address.styles";

export function Address(props) {
  const { address, selectedAddress, setSelectedAddress } = props;
  const data = address.attributes;

  const stylesSelected = address.id === selectedAddress?.id && styles.checked;

  return (
    <Pressable onPress={() => setSelectedAddress(address)}>
      <View style={[styles.container, stylesSelected]}>
        <Text style={styles.title}>{data.title}</Text>
        <Text>{data.name}</Text>
        <Text>{data.address}</Text>
        <Text>
          {data.state}, {data.city}, {data.postal_code}
        </Text>
        <Text>{data.country}</Text>
        <Text>Numero de telefono: {data.phone}</Text>
      </View>
    </Pressable>
  );
}
