import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';

const ROOT_URL = `http://localhost:8000/products`;

export function fetchProducts(page, category) {
  const request = axios.get('http://localhost:8000/products', {
    params: {
      page: page,
      category: category
    }
  })

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}