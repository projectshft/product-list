import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCT_COUNT = "FETCH_PRODUCT_COUNT";
// TODO -> might need to create  a reducer to count products for pagination.
// export const FETCH_PRODUCT_COUNT = "FETCH_PRODUCT_COUNT";

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