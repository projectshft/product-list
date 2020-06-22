import axios from 'axios';

const ROOT_URL = `http://localhost:8000`;

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';


//get products by search query
export function fetchProducts(searchParam) {
  const url = `${ROOT_URL}/products?query=${searchParam}`;
  const request = axios.get(url);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export const CATEGORY_SORT = 'CATEGORY_SORT';
//sort products by category name
export function categorySort(categoryParam, query) {
  const url = `${ROOT_URL}/products?query=${query}&category=${categoryParam}`; //when I hardcode a query in, it renders off center
  // const url = `${ROOT_URL}/products?category=${categoryParam}`; //how to add on optional params?
  const request = axios.get(url);

  return {
    type: CATEGORY_SORT,
    payload: request
  };
}

export const PRICE_SORT = 'PRICE_SORT';
//sort products by category name
export function priceSort(price, query) {
  const url = `${ROOT_URL}/products?query=${query}&price=${price}`; //how to add on optional params?
  const request = axios.get(url);

  return {
    type: PRICE_SORT,
    payload: request
  };
}