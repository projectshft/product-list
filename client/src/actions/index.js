import axios from '../axios';

const CORS_HEADERS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, X-Authentication" };
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_PAGE = 'FETCH_PRODUCTS_PAGE';
export const FETCH_FILTERED_PRODUCTS = 'FETCH_FILTERED_PRODUCTS';
export const FETCH_BY_PRICE = 'FETCH_BY_PRICE';
export const FETCH_BY_PRODUCT_NAME = 'FETCH_BY_PRODUCT_NAME';

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

export function fetchFilteredProducts(category) {
  const request = axios.get(`products?category=${category}`, {
    headers: CORS_HEADERS
  });

  return {
    type: FETCH_FILTERED_PRODUCTS,
    payload: request
  }
}

export function fetchByPrice(priceCriteria) {
  const request = axios.get(`products?price=${priceCriteria}`, {
    headers: CORS_HEADERS
  });

  return {
    type: FETCH_BY_PRICE,
    payload: request
  }
}

export function fetchByProductName(productName) {
  const request = axios.get(`products?productName=${productName}`, {
    headers: CORS_HEADERS
  });

  return {
    type: FETCH_BY_PRODUCT_NAME,
    payload: request
  }
}