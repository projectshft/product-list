import axios from 'axios'

const ROOT_URL = "//localhost:8000/"

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

let searchPath = "";
let categoryPath = "";
let sortPath = "";

export function fetchProducts(searchTerm="", category="", sortBy="") {
  console.log("category: " + category);
  console.log("searchterm: " + searchTerm);
  console.log("sortBy: " + sortBy);
  if (searchTerm) {
    searchPath = "query=" + searchTerm;
  }
  if (category.length > 0) {
    console.log("IF CATEGORY: " + category);
    console.log(category.length);
    categoryPath = "category=" + category;
  }
  if (sortBy) {
    sortPath = "price=" + sortBy;
  }
  
  
  const url = `${ROOT_URL}products?${searchPath}&${categoryPath}&${sortPath}`;

  const request = axios.get(url);
  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }

}

export const addSearchTerm = searchTerm => ({
  type: "ADD_SEARCHTERM",
  payload: searchTerm
})

export const addCategory = category => ({
  type: "ADD_CATEGORY",
  payload: category
})

export const addSortBy = sortBy => ({
  type: "ADD_SORTBY",
  payload: sortBy
})
