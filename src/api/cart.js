import AsyncStorage from "@react-native-async-storage/async-storage";
import { size, map, filter } from "lodash";
import { CART } from "../utils/constants";

export async function getProductCartApi() {
  try {
    const cart = await AsyncStorage.getItem(CART);
    if (!cart) return [];
    return JSON.parse(cart);
  } catch (e) {
    return null;
  }
}

export async function addProductCartApi(idProduct, quantity) {
  try {
    const cart = await getProductCartApi();

    if (size(cart) === 0) {
      cart.push({
        idProduct,
        quantity,
      });
    } else {
      let found = false;

      map(cart, (product) => {
        if (product.idProduct === idProduct) {
          product.quantity += quantity;
          found = true;
          return product;
        }
      });

      if (!found) {
        cart.push({
          idProduct,
          quantity,
        });
      }
    }

    await AsyncStorage.setItem(CART, JSON.stringify(cart));
    return true;
  } catch (e) {
    return false;
  }
}

export async function deleteProductCartApi(idProduct) {
  try {
    const cart = await getProductCartApi();
    const newCart = filter(cart, (product) => {
      return product.idProduct !== idProduct;
    });
    await AsyncStorage.setItem(CART, JSON.stringify(newCart));
    return true;
  } catch (e) {
    return null;
  }
}

export async function decreaseProductCartApi(idProduct) {
  let isDelete = false;

  try {
    const cart = await getProductCartApi();
    map(cart, (product) => {
      if (product.idProduct === idProduct) {
        if (product.quantity === 1) {
          isDelete = true;
          return null;
        } else {
          return (product.quantity -= 1);
        }
      }
    });

    if (isDelete) {
      await deleteProductCartApi(idProduct);
    } else {
      await AsyncStorage.setItem(CART, JSON.stringify(cart));
    }

    return true;
  } catch (e) {
    return null;
  }
}

export async function increaseProductCartApi(idProduct) {
  try {
    const cart = await getProductCartApi();
    map(cart, (product) => {
      if (product.idProduct === idProduct) {
        return (product.quantity += 1);
      }
    });

    await AsyncStorage.setItem(CART, JSON.stringify(cart));
    return true;
  } catch (e) {
    return null;
  }
}
