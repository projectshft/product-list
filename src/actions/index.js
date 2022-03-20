import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

const ROOT_URL = 'http://localhost:8000/products?';

export function fetchProducts(key, value) {
  const queryItems = new URLSearchParams(document.location.search);

  queryItems.set(key, value);
  const request = axios.get(`${ROOT_URL}${queryItems}`);

  if (key?.length > 0 && value?.length > 0) {
    document.location.search = queryItems;
  }

  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
}
