import axios from 'axios';


export const FETCH_PRODUCTS = 'fetch_products';
export const FETCH_BY_CATEGORY = 'fetch_by_category';
export const UPDATE_STORE_CATEGORY = 'update_store_category';
export const FETCH_WITH_SORT = 'fetch_with_sort';
export const UPDATE_SORT_ORDER = 'update_sort_order';

const ROOT_URL = 'http://localhost:8000/products';

export function fetchProducts(){
  const request = axios.get(`${ROOT_URL}`);
  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}

export function fetchProductsWithCategory(sort, category){
  console.log('from cat action:' +sort);
  const request = axios.get(`${ROOT_URL}?category=${category}&&price=${sort}`);
  console.log('from cat action:' + request);
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
export function fetchProductsWithSort(catQuery, sort){
  console.log('from sort action:'+ sort);
  const request = axios.get(`${ROOT_URL}?category=${catQuery}&&price=${sort}`);
  console.log('from sort action:' + request);
  return{
    type: FETCH_WITH_SORT,
    payload: request
  }
}
export function updateSortOrder(sort){
  return{
    type: UPDATE_SORT_ORDER,
    payload: sort
  }
}