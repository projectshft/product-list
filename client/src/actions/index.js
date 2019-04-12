import axios from '../axios';

const CORS_HEADERS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, X-Authentication" };
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts() {
  const request = axios.get('products', {
    headers: CORS_HEADERS
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}