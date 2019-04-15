import axios from 'axios';

const ROOT_URL = `http://localhost:8000/products`;

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

//Can ACTION function have multiple parameters passed in?
// How to make parameters optional?

export function fetchProducts(pageQuery, categoryQuery) {
  // export function fetchProducts(categoryQuery) {
    // export function fetchProducts(pageQuery) {

  const url = `${ROOT_URL}?page=${pageQuery}&category=${categoryQuery}`;

  // const url = `${ROOT_URL}?page=${pageQuery}`;

  // const url = `${ROOT_URL}?category=${categoryQuery}`;

  const request = axios.get(url);

  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}