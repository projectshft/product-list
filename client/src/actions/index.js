import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';

export function fetchProducts(page, category, sort) {
  const request = axios.get('http://localhost:8000/products', {
    params: {
      page: page,
      category: category,
      sort: sort
    }
  })

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}