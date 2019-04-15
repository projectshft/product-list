import axios from 'axios';

const ROOT_URL = `http://localhost:8000/products`;

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FILTER_CATEGORIES = 'FILTER_CATEGORIES';

// Only used for initial page load to return all products
export function fetchProducts(page) {

  const url = `${ROOT_URL}?page=${page}`;
  const request = axios.get(url);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

//Can ACTION function have multiple parameters passed in?
// How to make parameters optional?

// Use location.search to create QueryData Object(?)
/*
export function queryData() {
  let queryObject = {
    page: '',
    category: '',
    price: ''
  }
  return {
    type: QUERY_DATA,
    payload: queryObject
  };
}
*/

// Action to filter by a category, dispatched by {CategoryMenu} component
export function filterCategories(categoryQuery) {

  const url = `${ROOT_URL}?category=${categoryQuery}`;

  const request = axios.get(url);

  console.log('Request', request);

  return {
    type: FILTER_CATEGORIES,
    payload: request
  };
}