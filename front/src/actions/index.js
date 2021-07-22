import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_COUNT = "FETCH_COUNT";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const SET_PAGE_QUERY = "SET_PAGE_QUERY";
export const SET_CATEGORY_QUERY = "SET_CATEGORY_QUERY";
export const SET_PRICE_SORT_METHOD = "SET_PRICE_SORT_METHOD";

const ROOT_URL = "http://localhost:8000";

export function fetchProducts(queries) {
  const request = axios.get(`${ROOT_URL}/products` + queries);

  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
}

export function fetchCount(queries) {
  const request = axios.get(`${ROOT_URL}/products` + queries);

  return {
    type: FETCH_COUNT,
    payload: request,
  };
}

export function setSearchTerm(searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm,
  };
}

export function setPageQuery(pageNumber) {
  return {
    type: SET_PAGE_QUERY,
    payload: pageNumber,
  };
}

export function setCategoryQuery(category) {
  return {
    type: SET_CATEGORY_QUERY,
    payload: category,
  };
}

export function setPriceSortMethod(priceSortMethod) {
  return {
    type: SET_PRICE_SORT_METHOD,
    payload: priceSortMethod,
  };
}
