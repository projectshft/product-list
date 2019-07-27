import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';
export const FETCH_BY_CATEGORY = 'fetch_by_category';
export const UPDATE_STORE_CATEGORY = 'update_store_category';

const ROOT_URL = 'http://localhost:8000';

export function fetchProducts(){
  const request = axios.get(`${ROOT_URL}/products`);
  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}

export function fetchProductsWithCategory(category){
  const request = axios.get(`${ROOT_URL}/products?category=${category}`);
  return{
    type: FETCH_BY_CATEGORY,
    payload: request
  }
} 

export function updateStoreCategory(category){
  return{
    type: UPDATE_STORE_CATEGORY,
    payload: category
  }
}