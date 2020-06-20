import axios from "axios";

export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const SORT_PRODUCTS = "SORT_PRODUCTS";

const ROOT_URL = `http://localhost:8000`;

export function searchProducts(term) {
  const url = `${ROOT_URL}/products`;
  const request = axios.get(url);

  request.then(console.log("request is", request));

  return {
    type: SEARCH_PRODUCTS,
    payload: request,
  };
}

export function filterCategory(term) {
  const request = "";

  request.then(console.log("HI!!!!"));

  return {
    type: FILTER_CATEGORY,
    payload: request,
  };
}

export function sortProducts(term) {
  const request = "";

  request.then(console.log("HI!!!!"));

  return {
    type: SORT_PRODUCTS,
    payload: request,
  };
}
