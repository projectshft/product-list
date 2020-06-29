import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';


//const API_KEY = ''; API KEY NOT NEEDED
const ROOT_URL = 'localhost:8000/products'

//API pull for Park information
export function fetchProductInformation(query, category, sort) {
  const url = `${ROOT_URL}/?page=1&category=${category}&sort=${sort}&query=${query}`
  const request = axios.get(url);

  console.log('Request', request);
  //this is the action; need to call the redux store dispatch
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}