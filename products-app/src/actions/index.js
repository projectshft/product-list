import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const SORT_PRODUCTS = "SORT_PRODUCTS";
export const SORT_CATEGORY = "SORT_CATEGORY"

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

  return {
    type: SORT_PRODUCTS,
    payload: request
  }
};

export function sortCategory(category) {
  const request = axios.get(`${ROOT_URL}?category=${category}`).catch(error => {
    alert(error)
  });

  return {
    type: SORT_CATEGORY,
    payload: request
  }
}