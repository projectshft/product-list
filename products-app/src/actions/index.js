import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const SORT_PRODUCTS = "SORT_PRODUCTS";

const ROOT_URL = "http://localhost:8000/products";

export function fetchProducts() {
  return {
    type: FETCH_PRODUCTS,
  }
}

export function sortProducts(factor) {
  const request = axios.get(`${ROOT_URL}?price=${factor}`).catch(error => {
    alert(error);
  });
  debugger;

  return {
    type: SORT_PRODUCTS,
    payload: request
  }
}