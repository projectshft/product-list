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
export function categorySort(categoryParam) {
  const url = `${ROOT_URL}/products?category=Tools`;//hardcoded for now
  const request = axios.get(url);

  return {
    type: CATEGORY_SORT,
    payload: request
  };
}