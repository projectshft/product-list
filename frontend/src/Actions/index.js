import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';

const ROOT_URL = 'http://localhost:8000';
const GET_PRODUCTS = '/products';

//take in an options object, 0-4 fields
// page number, category, price (sort), search
export function fetchProducts({ page=1, category, price }) {
  let totalRequestString = `${ROOT_URL}${GET_PRODUCTS}?page=${page}`;
  if (category) {
    totalRequestString += `&category=${category}`;
  }
  if (price) {
    totalRequestString += `&price=${price}`;
  }
  const request = axios.get(totalRequestString);
  console.log(totalRequestString, request);
  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
};