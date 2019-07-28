import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products'

const ROOT_URL = "http://localhost:8000"

export function fetchProducts(searchQuery) {
  const request = axios.get(`${ROOT_URL}/products`, {
    params: {
    }
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}
