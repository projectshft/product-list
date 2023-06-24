import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

const url = "http://localhost:8000/products";

export function fetchProducts(query) {
  const url = "http://localhost:8000/products";

  const request = axios.get(`${url}`)
  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}