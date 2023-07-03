import { useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import { size } from "lodash";
import { productCtrl } from "../../api";
import { useSearch } from "../../hooks";
import { Layout } from "../../layouts";
import { LoadingScreen, Search, GridProducts } from "../../components/Shared";

export function SearchScreen() {
  const [products, setProducts] = useState(null);
  const { searchText } = useSearch();

  useEffect(() => {
    getProductSearch();
  }, [searchText]);

  const getProductSearch = async () => {
    try {
      const response = await productCtrl.search(searchText);
      setProducts(response.data);
    } catch (error) {
      Toast.show("Error al obtener los productos de la busqeuda", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <Layout.Basic>
      {!products ? (
        <LoadingScreen text="Buscando productos" />
      ) : size(products) === 0 ? (
        <Search.ResultNotFound searchText={searchText} />
      ) : (
        <GridProducts products={products} />
      )}
    </Layout.Basic>
  );
}
