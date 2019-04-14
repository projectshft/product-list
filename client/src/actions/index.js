import axios from '../axios';
import { urlQueryObject } from '../urlQueries';

const CORS_HEADERS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, X-Authentication" };
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_PAGE = 'FETCH_PRODUCTS_PAGE';
export const FETCH_FILTERED_PRODUCTS = 'FETCH_FILTERED_PRODUCTS';
export const FETCH_BY_PRICE = 'FETCH_BY_PRICE';
export const FETCH_BY_PRODUCT_NAME = 'FETCH_BY_PRODUCT_NAME';

export function fetchProducts(query, price) {
  const request = axios.get('', {
    headers: CORS_HEADERS
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}

export function fetchProductsPage(pageNumber) {
  urlQueryObject.pageQuery = `page=${pageNumber}`
  const request = axios.get(`?${
    urlQueryObject.pageQuery}&${urlQueryObject.categoryQuery}&${urlQueryObject.priceQuery}`, {
      headers: CORS_HEADERS
    });

  return {
    type: FETCH_PRODUCTS_PAGE,
    payload: request
  }
}

export function fetchFilteredProducts(urlObject) {
  const request = axios.get(`?${urlObject.categoryQuery}&${urlObject.priceQuery}&${urlQueryObject.pageQuery}`, {
    headers: CORS_HEADERS
  });

  return {
    type: FETCH_FILTERED_PRODUCTS,
    payload: request
  }
}

export function fetchByPrice(urlObject) {
  const request = axios.get(`?${urlObject.priceQuery}&${urlObject.categoryQuery}&${urlObject.pageQuery}`, {
    headers: CORS_HEADERS
  });

  return {
    type: FETCH_BY_PRICE,
    payload: request
  }
}

export function fetchByProductName(productName) {
  const request = axios.get(`?productName=${productName}`, {
    headers: CORS_HEADERS
  });

  return {
    type: FETCH_BY_PRODUCT_NAME,
    payload: request
  }
}
