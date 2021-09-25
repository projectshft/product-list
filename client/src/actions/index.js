import axios from "axios";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";


export function fetchProducts(params) {

  const url = "http://localhost:8000/products/?"
  const request = axios.get(url + params);

  return {
    type: 'FETCH_PRODUCTS',
    payload: request
  }
}