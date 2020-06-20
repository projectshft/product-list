import axios from 'axios'

const ROOT_URL = "//localhost:8000/"

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

let searchPath = "";
let categoryPath = "";
let sortPath = "";

export function fetchProducts(searchTerm, category, sortBy) {
  if (searchTerm) {
    searchPath = "?query=" + searchTerm;
  }
  if (category) {
    categoryPath = "?category=" + category;
  }
  if (sortPath) {
    sortPath = "?price=" + sortBy;
  }
  
  
  const url = `${ROOT_URL}products${searchPath}${categoryPath}${sortPath}`;

  const request = axios.get(url);
  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }

}