import axios from '../axios';

const CORS_HEADERS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, X-Authentication" };
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_PAGE = 'FETCH_PRODUCTS_PAGE';

export function fetchProducts() {
  const request = axios.get('products', {
    headers: CORS_HEADERS
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}

export function fetchProductsPage(pageNumber) {
  const request = axios.get(`products?page=${pageNumber}`, {
    headers: CORS_HEADERS
  });

  return {
    type: FETCH_PRODUCTS_PAGE,
    payload: request
  }
}