import axios from 'axios';

//const ROOT_URL = ;

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts() {
  const url = 'http://localhost:8000/products'; // we're going to have to do some work here
  const request = axios.get(url);

  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}