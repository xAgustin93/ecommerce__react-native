import { View, Text } from "react-native";
import { map } from "lodash";
import { Order } from "./Order";
import { styles } from "./OrderList.styles";

export function OrderList(props) {
  const { orders } = props;

  return (
    <View style={styles.container}>
      {map(orders, (order) => (
        <Order key={order.id} order={order} />
      ))}
    </View>
  );
}
