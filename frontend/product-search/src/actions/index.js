import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

const ROOT_URL = 'http://localhost:8000/products/';

export const fetchProducts = (term) => {
  const url = `${ROOT_URL}?query=${term}`;
  const request = axios.get(url);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}