import axios from 'axios';

const API_KEY = 'baa280a65d9a5786919fda92ca7532a8';
const ROOT_URL = 'localhost:8000/products';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts(query) {
  const url = `${ROOT_URL}`;
  const request = axios.get(url);

  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}
