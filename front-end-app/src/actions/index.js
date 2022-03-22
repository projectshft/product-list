import axios from 'axios';

export const PAGE_SET = 'PAGE_SET';
export const QUERY_SET = 'QUERY_SET';
export const CATEGORY_SET = 'CATEGORY_SET';
export const PRICE_SORT_SET = 'PRICE_SORT_SET';
export const PAGE_OF_PRODUCTS_RECEIVED = 'PAGE_OF_PRODUCTS_RECEIVED';

const rootUrl = 'http://localhost:8000';

export const setSearchSetting = (property, value) => {
  return {
    type: property,
    payload: value
  }
};

export const getProducts = (settings) => {

  const productsData = axios
    .get(`${rootUrl}/products?page=${settings.page}&category=${settings.category}&price=${settings.priceSort}&query=${settings.query}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    })

  return {
    type: PAGE_OF_PRODUCTS_RECEIVED,
    payload: productsData
  }
}