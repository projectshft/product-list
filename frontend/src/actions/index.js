import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/products';

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const SET_SORT_OPTION = 'SET_SORT_OPTION';
export const SET_CATEGORY = 'SET_CATEGORY';

export function fetchProducts(query) {
  let url = ROOT_URL; 
  
  if (!query) {
    url = ROOT_URL;
  } else {
    url = ROOT_URL + "?search=" + query; 
  }
  
  const request = axios.get(url);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function setSortOption(sortOption) {
  return {
    type: SET_SORT_OPTION,
    payload: sortOption
  }
}

export function setSearchTerm(searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm
  }
}

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    payload: category
  }
}


