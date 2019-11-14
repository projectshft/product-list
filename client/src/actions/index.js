
import axios from "axios";
export const FETCH_PRODUCTS = "fetch_products";
export const SAVE_CATEGORY = 'save_category';
export const SAVE_SORT = 'save_sort';


const ROOT_URL = "http://localhost:8000/products";

export function fetchProducts(page, category, sort) {
    const request = axios.get(`${ROOT_URL}?page=${page}&&category=${category}&&price=${sort}`)
    return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}
// state will be updated throughout 
export function saveCategory(category) {
  return {
    type:SAVE_CATEGORY,
    payload: category
  }
}
//sort will be updated throughout
export function saveSort(sort) {
    return {
      type: SAVE_SORT,
      payload: sort
    }
  }