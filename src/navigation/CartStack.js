import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../screens/Cart";
import colors from "../styles/colors";

const Stack = createStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="cart"
        component={Cart}
        options={{ title: "Confirmar pedido" }}
      />
    </Stack.Navigator>
  );
}
