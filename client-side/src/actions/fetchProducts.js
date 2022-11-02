import axios from "axios";

export const FETCH_FIRST = "FETCH_FIRST";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts(pageNumber, price, category, query) {
  const request = axios.get(
    `http://localhost:8000/products?page=${pageNumber}&query=${query}&category=${category}&price=${price}`
  );
  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
}

export function fetchFirst() {
  const request = axios.get("http://localhost:8000/products?page=1");
  return {
    type: FETCH_FIRST,
    payload: request,
  };
}
