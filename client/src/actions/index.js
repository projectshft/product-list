import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";
export const PAGINATE_PRODUCTS = 'paginate_products';

const ROOT_URL = "http://localhost:8000";

export function fetchProducts() {
  const request = axios.get(`${ROOT_URL}/products`);
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function paginateProducts(id) {
  const request = axios.get(`${ROOT_URL}?page=${id}`)
  return {
    type: PAGINATE_PRODUCTS,
    payload: request
  }
}