import { size } from "lodash";
import { API_URL } from "../utils/constants";

export async function addFavoriteApi(auth, idProduct) {
  try {
    const url = `${API_URL}/favorites`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        product: idProduct,
        user: auth.idUser,
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isFavoriteApi(auth, idProduct) {
  try {
    const url = `${API_URL}/favorites?user=${auth.idUser}&product=${idProduct}`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteFavoriteApi(auth, idProduct) {
  try {
    const dataFound = await isFavoriteApi(auth, idProduct);
    if (size(dataFound) > 0) {
      const url = `${API_URL}/favorites/${dataFound[0]?._id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoriteApi(auth) {
  try {
    const url = `${API_URL}/favorites?user=${auth.idUser}`;
    const params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}
