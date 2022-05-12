import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/products?'

export const PRODUCTS = 'PRODUCTS';
export const DUMMY = 'DUMMY';

export function productSearch(price, search, category, page) {
  const url = `${ROOT_URL}price=${price}&query=${search}&category=${category}&page=${page}`
  console.log(url);
  const request = axios.get(`${ROOT_URL}?price=${price}&query=${search}&category=${category}&page=${page}`);
  return {
    type: PRODUCTS,
    payload: request
  }
};

export function dummyData(a) {
  const request = axios.get('www.google.com');
  return {
    type: DUMMY,
    payload: request
  }
};