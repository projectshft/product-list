import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/products';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts(query) {
  let url = ROOT_URL; 
  
  if (!query) {
    url = ROOT_URL;
  } else {
    url = ROOT_URL + "?search=" + query; 
  }
  
  const request = axios.get(url);

  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

