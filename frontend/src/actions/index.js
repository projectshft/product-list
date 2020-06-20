import axios from 'axios';

const ROOT_URL = `http://localhost:8000`;

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

//get all products
export function fetchProducts(searchParam) {
  const url = `${ROOT_URL}/products?query=${searchParam}`;
  const request = axios.get(url);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}