import axios from "axios";

export const INITIALIZE_PRODUCTS = 'INITIALIZE_PRODUCTS';
export const INITIALIZE_CATEGORIES = 'INITIALIZE_CATEGORIES';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const NEXT_PAGE_PRODUCTS = 'NEXT_PAGE_PRODUCTS';

const ROOT_URL = "http://localhost:8000/";

export function searchProducts(queryObject) {
  const {query, page, sort} = queryObject;
  const request = axios.get(`${ROOT_URL}/products?page=${page}&query=${query}&price=${sort}`);

  return {
    type: SEARCH_PRODUCTS,
    payload: request
  };
}