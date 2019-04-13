import axios from 'axios';


const ROOT_URL = `http://localhost:8000/products`;

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts(city) {
  const url = `${ROOT_URL}`;
  const request = axios.get(url);

  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}