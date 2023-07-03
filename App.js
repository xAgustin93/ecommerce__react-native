import { PaperProvider } from "react-native-paper";
import { AuthProvider, SearchProvider, CartProvider } from "./src/contexts";
import { RootNavigation } from "./src/navigation";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <PaperProvider>
            <RootNavigation />
          </PaperProvider>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}
