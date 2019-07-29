import axios from "axios";

export const INITIALIZE_PRODUCTS = 'INITIALIZE_PRODUCTS';
export const INITIALIZE_CATEGORIES = 'INITIALIZE_CATEGORIES';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const NEXT_PAGE_PRODUCTS = 'NEXT_PAGE_PRODUCTS';

const ROOT_URL = "http://localhost:8000";

export function searchProducts(queryObject) {
  console.log('searching!');
  let queryUrl = `${ROOT_URL}/products?`;
  let queryString = '';
  const {query, page, price, category} = queryObject;

  if(query){
    queryString += `query=${query}&`
  }

  if (page) {
    queryString += `page=${page}&`
  }

  if (price) {
    queryString += `price=${price}&`
  }

  if (category) {
    queryString += `category=${category}&`
  }

  if(queryString.length > 0){queryUrl += queryString };
  // const queryUrl = `${ROOT_URL}/products?page=${page}&query=${query}&price=${sort}`;
  
  const request = axios.get(queryUrl);

  return {
    type: SEARCH_PRODUCTS,
    payload: request
  };
}