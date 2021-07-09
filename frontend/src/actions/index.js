import axios from "axios";
import { saveState } from "../localStorage";

const ROOT_URL = "localhost:8000/products?";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_CATEGORY = "FETCH_CATEGORY";
export const FETCH_SORT = "FETCH_SORT";
export const FETCH_SEARCHTERM = "FETCH_SEARCHTERM";
export const FETCH_PAGENUMBER = "FETCH_PAGENUMBER";

export function fetchProducts(data) {
  const request = axios.get(`${ROOT_URL}`);

  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
}

export function fetchCategory(category) {
  return {
    type: FETCH_CATEGORY,
    payload: category,
  };
}

export function fetchSort(sort) {
  return {
    type: FETCH_SORT,
    payload: sort,
  };
}

export function fetchSearchTerm(search) {
  return {
    type: FETCH_SEARCHTERM,
    payload: search,
  };
}

export function fetchPageNumber(page) {
  return {
    type: FETCH_PAGENUMBER,
    payload: page,
  };
}
