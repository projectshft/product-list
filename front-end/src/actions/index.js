import axios from 'axios';

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts(search) {
  const request = axios.get('http://localhost:8000/products', {
    params: {
      query: search.query,
      price: search.price,
      category: search.category
    }
  })

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}