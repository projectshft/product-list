import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';
export const FETCH_BY_CATEGORY = 'fetch_by_category';

const ROOT_URL = 'http://localhost:8000';

export function fetchProducts(){
  const request = axios.get(`${ROOT_URL}/products`);
  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}

export function fetchProductsWithCategory(category){
  console.log('action triggered!')
  const request = axios.get(`${ROOT_URL}/products?category=${category}`);


  return{
    type: FETCH_BY_CATEGORY,
    payload: request
  }
} 

