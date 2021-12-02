import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCT_COUNT = "FETCH_PRODUCT_COUNT";
export const FETCH_PRODUCT_CATEGORIES = "FETCH_PRODUCT_CATEGORIES";

const ROOT_URL = "http://localhost:8000";

export function fetchProducts(params) {
  const request = axios.get(`${ROOT_URL}/products/?${params}`);

  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
}

export function fetchProductCount(params) {
  const request = axios.get(`${ROOT_URL}/products?${params}`);

  return {
    type: FETCH_PRODUCT_COUNT,
    payload: request,
  }
}

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/products/categories`);

  return {
    type: FETCH_PRODUCT_CATEGORIES,
    payload: request,
  }
}