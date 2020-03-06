import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/products'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts() {

  const url = `${ROOT_URL}`
  console.log(url)
  const request = axios.get(url)
    .catch(function (error) {
      if (error.response) {
        console.log(error)
      }
    });
    console.log('request', request)
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}