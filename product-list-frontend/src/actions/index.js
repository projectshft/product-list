import axios from 'axios';
export const LOAD_PRODUCTS = 'load_products';

const url =
  'http://localhost:8000/products';

export function loadProducts() {
  const products = axios.get(`${url}`);
  return {
    type: LOAD_PRODUCTS,
    payload: products
  };
}