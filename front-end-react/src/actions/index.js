import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'; //a convention to add a line like this
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const SEARCH_CATEGORIES = 'SEARCH_CATEGORIES';
export const SORT_PRODUCTS = 'SORT_PRODUCTS';

const ROOT_URL = 'http://localhost:8000/products';

export function fetchProducts() {  //search, page, category, sort
  const request = axios.get(`${ROOT_URL}`); //a promise

  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS, //FETCH_PRODUCTS is action name"
    payload: request //api call
  };
}

export function searchProducts(search) {  //search, page, category, sort
  const request = axios.get(`${ROOT_URL}?search=${search}`); //a promise

  console.log('Request', request);

  return {
    type: SEARCH_PRODUCTS, //action name"
    payload: request //api call
  };
}

export function searchCategories(category) {  //search, page, category, sort
  const request = axios.get(`${ROOT_URL}?category=${category}`); //a promise

  console.log('Request', request);

  return {
    type: SEARCH_CATEGORIES, //action name"
    payload: request //api call
  };
}

export function sortProducts(sort) {  //search, page, category, sort
  const request = axios.get(`${ROOT_URL}?sort=${sort}`); //a promise

  console.log('Request', request);

  return {
    type: SORT_PRODUCTS, //action name"
    payload: request //api call
  };
}