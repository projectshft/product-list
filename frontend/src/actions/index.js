import axios from "axios";

const ROOT_URL = "http://localhost:8000/products?";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts(searchTerm, category, sort, page) {
  const request = axios.get(
    `${ROOT_URL}page=${page}&query=${searchTerm}&category=${category}&price=${sort}`
  );

  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
}
