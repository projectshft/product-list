import axios from 'axios';


export const FETCH_PRODUCTS = 'fetch_products';
export const UPDATE_STORE_CATEGORY = 'update_store_category';
export const UPDATE_SORT_ORDER = 'update_sort_order';

const ROOT_URL = 'http://localhost:8000/products';


//this action dispatches to multiple reducers - error, products, currentPage and totalPage
export function fetchProducts(page, sort, category) {
  const request = axios.get(`${ROOT_URL}?page=${page}&&category=${category}&&price=${sort}`);
  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}

export function updateStoreCategory(category) {
  return {
    type: UPDATE_STORE_CATEGORY,
    payload: category
  }
}

export function updateSortOrder(sort) {
  return {
    type: UPDATE_SORT_ORDER,
    payload: sort
  }
}