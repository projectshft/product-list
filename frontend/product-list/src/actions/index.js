import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_CATEGORY_LIST = "FETCH_CATEGORY_LIST";
export const SET_CATEGORY = "SET_CATEGORY";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";

const ROOT_URL = "http://localhost:8000";

export function fetchProducts(page, category, sort, query) {
  const request = axios.get(`${ROOT_URL}/products?page=${page}&category=${category}&sort=${sort}&query=${query}`);
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/category-list`);
  
  return {
    type: FETCH_CATEGORY_LIST,
    payload: request
  };
}

export function setCategory(category) {

  return {
    type: SET_CATEGORY,
    payload: category
  };
}

export function searchProducts(query) {
  return {
    type: SEARCH_PRODUCTS,
    payload: query.query
  };
}
