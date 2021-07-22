import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_COUNT = "FETCH_COUNT";
export const FETCH_ALL_CATEGORIES = "FETCH_ALL_CATEGORIES";
export const SET_PAGE_QUERY = "SET_PAGE_QUERY";

const ROOT_URL = "http://localhost:8000";

export function fetchProducts(queryString) {
  const request = axios.get(`${ROOT_URL}/products` + queryString);

  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
}

export function fetchCount(queryString) {
  const request = axios.get(`${ROOT_URL}/products` + queryString);

  return {
    type: FETCH_COUNT,
    payload: request,
  };
}

export function fetchAllCategories() {
  const request = axios.get(`${ROOT_URL}/products`);

  return {
    type: FETCH_ALL_CATEGORIES,
    payload: request,
  };
}

export function setPageQuery(pageNumber) {
  return {
    type: SET_PAGE_QUERY,
    payload: pageNumber,
  };
}
