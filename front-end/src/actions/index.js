import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts(query) {
  const request = axios.get('localhost:5000/' + query)

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}