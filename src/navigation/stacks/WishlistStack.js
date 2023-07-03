import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WishlistScreen } from "../../screens/Wishlist";
import { screensName } from "../../utils";

const Stack = createNativeStackNavigator();

export function WishlistStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screensName.wishlist.wishlist}
        component={WishlistScreen}
      />
    </Stack.Navigator>
  );
}
