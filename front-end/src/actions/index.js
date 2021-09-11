import axios from 'axios';

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts(search, price) {
  const request = axios.get('http://localhost:8000/products', {
    params: {
      query: search,
      price: price
    }
  })

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}