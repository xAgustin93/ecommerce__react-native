import { ENV } from "../utils";

async function getLatestPublished(limite = 20) {
  try {
    const sortFilter = "sort=publishedAt:desc";
    const paginationFilter = `pagination[limit]=${limite}`;
    const populateFilter = "populate=*";
    const filters = `${sortFilter}&${paginationFilter}&${populateFilter}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}?${filters}`;

    const response = await fetch(url);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function searchProduct(text) {
  try {
    const searchTitleFilter = `filters[title][$contains]=${text}`;
    const pagination = "pagination[pageSize]=100";
    const populate = "populate=*";
    const filters = `${searchTitleFilter}&${pagination}&${populate}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}?${filters}`;

    const response = await fetch(url);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  try {
    const populateFilter = "populate=*";
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PRODUCTS}/${id}?${populateFilter}`;

    const response = await fetch(url);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const productCtrl = {
  getLatestPublished,
  search: searchProduct,
  getById: getProductById,
};
