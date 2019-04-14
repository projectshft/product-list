import axios from 'axios';

//import Pagination?

const ROOT_URL = `http://localhost:8000/products`;

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts(pageQuery) {
  const url = `${ROOT_URL}?page=${pageQuery}`;
  const request = axios.get(url);

  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}