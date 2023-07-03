import { useState, useEffect, createContext } from "react";
import { cartCtrl } from "../api";

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    retriveCart();
    countTotalProducts();
  }, [reload]);

  const onReload = () => setReload((prevState) => !prevState);

  const addCart = async (productId) => {
    try {
      await cartCtrl.add(productId);
      onReload();
    } catch (error) {
      throw error;
    }
  };

  const retriveCart = async () => {
    try {
      const response = await cartCtrl.getAll();
      setCart(response);
    } catch (error) {
      throw error;
    }
  };

  const countTotalProducts = async () => {
    try {
      const response = await cartCtrl.count();
      setTotalProducts(response);
    } catch (error) {
      throw error;
    }
  };

  const increaseProduct = async (productId) => {
    try {
      await cartCtrl.increaseProduct(productId);
      onReload();
    } catch (error) {
      throw error;
    }
  };

  const decreaseProduct = async (productId) => {
    try {
      await cartCtrl.decreaseProduct(productId);
      onReload();
    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await cartCtrl.delete(productId);
      onReload();
    } catch (error) {
      throw error;
    }
  };

  const emptyCart = async () => {
    try {
      await cartCtrl.deleteAll();
      onReload();
    } catch (error) {
      throw error;
    }
  };

  const data = {
    cart,
    totalProducts,
    addCart,
    deleteProduct,
    increaseProduct,
    decreaseProduct,
    emptyCart,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
