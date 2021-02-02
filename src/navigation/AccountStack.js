import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import ChangeName from "../screens/Account/ChangeName";
import ChangeEmail from "../screens/Account/ChangeEmail";
import ChangeUsername from "../screens/Account/ChangeUsername";
import ChangePassword from "../screens/Account/ChangePassword";
import Addresses from "../screens/Account/Addresses";
import AddAddress from "../screens/Account/AddAddress";
import Orders from "../screens/Account/Orders";
import colors from "../styles/colors";

const Stack = createStackNavigator();

export default function AccountStack() {
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
        name="account"
        component={Account}
        options={{ title: "Cuenta", headerShown: false }}
      />
      <Stack.Screen
        name="change-name"
        component={ChangeName}
        options={{
          title: "Cambiar nombre y apellidos",
        }}
      />
      <Stack.Screen
        name="change-email"
        component={ChangeEmail}
        options={{
          title: "Cambiar email",
        }}
      />
      <Stack.Screen
        name="change-username"
        component={ChangeUsername}
        options={{
          title: "Cambiar nombre de usuario",
        }}
      />
      <Stack.Screen
        name="change-password"
        component={ChangePassword}
        options={{
          title: "Cambiar contraseña",
        }}
      />
      <Stack.Screen
        name="addresses"
        component={Addresses}
        options={{
          title: "Mis direcciones",
        }}
      />
      <Stack.Screen
        name="add-address"
        component={AddAddress}
        options={{
          title: "Nueva dirección",
        }}
      />
      <Stack.Screen
        name="orders"
        component={Orders}
        options={{
          title: "Mis pedidos",
        }}
      />
    </Stack.Navigator>
  );
}
