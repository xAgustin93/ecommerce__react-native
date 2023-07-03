import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { orderCtrl } from "../../../api";
import { Layout } from "../../../layouts";
import { LoadingScreen, Separator } from "../../../components/Shared";
import { ProductList, Address } from "../../../components/Orders";
import { styles } from "./OrderScreen.styles";

export function OrderScreen(props) {
  const {
    route: { params },
  } = props;
  const [order, setOrder] = useState(null);
  const navigation = useNavigation();
  const orderId = params.id;

  useEffect(() => {
    navigation.setOptions({ title: `Pedido ${orderId}` });
    getOrder();
  }, [orderId]);

  const getOrder = async () => {
    try {
      const response = await orderCtrl.getById(orderId);
      setOrder(response);
    } catch (error) {
      Toast.show("Error al obtener el pedido", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <Layout.Basic hideSearch>
      <View style={styles.container}>
        {!order ? (
          <LoadingScreen text="Cargando pedido" />
        ) : (
          <View>
            <Separator height={20} />
            <Text style={styles.title}>Productos</Text>
            <ProductList products={order.products} />
            <Separator height={50} />
            <Text style={styles.title}>Dirección de envio</Text>
            <Separator height={20} />
            <Address address={order.addressShipping.attributes} />

            <Text style={styles.totalPayment}>
              Total: {order?.totalPayment}€
            </Text>
          </View>
        )}
      </View>
    </Layout.Basic>
  );
}
