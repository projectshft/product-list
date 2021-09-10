import axios from 'axios';

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts() {
  const request = axios.get('http://localhost:8000/products')

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}