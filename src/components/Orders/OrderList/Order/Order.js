import { View, Text, Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { DataTime, DateTime } from "luxon";
import { screensName } from "../../../../utils";
import { styles } from "./Order.styles";

export function Order(props) {
  const { order } = props;
  const navigation = useNavigation();
  const data = order.attributes;

  const goToOrder = () => {
    navigation.navigate(screensName.account.order, { id: order.id });
  };

  return (
    <Pressable onPress={goToOrder} style={styles.container}>
      <View>
        <Text>
          <Text style={styles.title}>Pedido: </Text>
          {order.id}
        </Text>
        <Text>
          <Text style={styles.title}>Total: </Text>
          {data.totalPayment}€
        </Text>
        <Text>
          <Text style={styles.title}>Fecha de compra: </Text>
          {DateTime.fromISO(data.createdAt, { locale: "es" }).toFormat(
            "dd/MM/yyyy"
          )}
        </Text>
      </View>
      <IconButton icon="eye" />
    </Pressable>
  );
}
