import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'; //a convention to add a line like this

const ROOT_URL = 'http://localhost:8000/products';
let request = '';

export function fetchProducts(search, category, sort, page) {
  request = axios.get(`${ROOT_URL}?search=${search}&category=${category}&sort=${sort}&page=${page}`); //a promise
  return {
    type: FETCH_PRODUCTS, //FETCH_PRODUCTS is action name"
    payload: request, //api call
  };
}
