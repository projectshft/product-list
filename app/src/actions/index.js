import axios from 'axios';

const ROOT_URL = `http://localhost:8000/products/`;

// set action type to a variable, to prevent possible typos in reducer
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'

export function fetchProducts(page, search, category, sort) {
  const url = `${ROOT_URL}?page=${page}&query=${search}&category=${category}&price=${sort}`;
  const request = axios.get(url);
  // at this point the request doesn't contain the returned api data yet, it's probably still in the pending state. We need a way to set our store state until AFTER the promise is fulfilled (when the api returns data). We only want to call the reducer when the data is returned, this is where applyMiddleware comes in (see the main index.js)
  //the payload is a promise (request)
  return {
    type: FETCH_WEATHER,
    payload: request
  };
}