import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'; //a convention to add a line like this

const ROOT_URL = 'http://localhost:8000/products';

export function fetchProducts() {  //search, page, category, sort
  const request = axios.get(`${ROOT_URL}`); //a promise

  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS, //FETCH_PRODUCTS is action name"
    payload: request //api call
  };
}

export function searchProducts() {  //search, page, category, sort
  const request = axios.get(`${ROOT_URL}?search={}`); //a promise

  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS, //FETCH_PRODUCTS is action name"
    payload: request //api call
  };
}