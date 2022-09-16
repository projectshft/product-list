import axios from 'axios';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_PRODUCTs = 'FETCH_PRODUCTs';

export function fetchProducts(pgNumber, price, category, query) {
  const request = axios.get(
    `http://localhost:8000/products?page=${pgNumber}&price=${price}&category=${category}&query=${query}`
  );
  console.log(pgNumber, price, category, query);
  return {
    type: FETCH_PRODUCTs,
    payload: request,
  };
}
export function fetchProduct() {
  const request = axios.get('http://localhost:8000/products?page=1');
  return {
    type: FETCH_PRODUCT,
    payload: request,
  };
}
