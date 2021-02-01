import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
import ProductStack from "./ProductStack";
import FavoritesScreen from "../screens/Favorites";
import CartStack from "./CartStack";
import AccountStack from "./AccountStack";

const Tab = createMaterialBottomTabNavigator();

export default function UserNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={styles.navigation}
        screenOptions={({ route }) => ({
          tabBarIcon: (routeStatus) => {
            return setIcon(route, routeStatus);
          },
        })}
      >
        <Tab.Screen
          name="home"
          component={ProductStack}
          options={{
            title: "Inicio",
          }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoritesScreen}
          options={{
            title: "Favoritos",
          }}
        />
        <Tab.Screen
          name="cart"
          component={CartStack}
          options={{
            title: "Carrito",
          }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{
            title: "Mi cuenta",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function setIcon(route, routeStatus) {
  let iconName = "";
  switch (route.name) {
    case "home":
      iconName = "home";
      break;
    case "favorites":
      iconName = "heart";
      break;
    case "cart":
      iconName = "shopping-cart";
      break;
    case "account":
      iconName = "bars";
      break;
    default:
      break;
  }
  return <AwesomeIcon name={iconName} style={[styles.icon]} />;
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: colors.bgDark,
  },
  icon: {
    fontSize: 20,
    color: colors.fontLight,
  },
});
