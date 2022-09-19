import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

const ROOT_URL = 'http://localhost:8000';

export async function fetchProducts(query) {
  const req = axios.get(`${ROOT_URL}/products`, { params: query });
  return { type: FETCH_PRODUCTS, payload: req };
}
