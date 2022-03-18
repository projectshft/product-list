import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

const ROOT_URL = 'http://localhost:8000/products?';

export function fetchProducts(query) {
  let request = axios.get(`${ROOT_URL}`);
  if (query) {
    request = axios.get(`${ROOT_URL}query=${query}`);
  }

  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
}
