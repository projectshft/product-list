import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products'

const ROOT_URL = "http://localhost:8000"

//Only have one action at the moment to GET /products based
//on the search query provided
export function fetchProducts(searchQuery) {
  const request = axios.get(`${ROOT_URL}/products`, {
    params: {
      ...searchQuery
    }
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}
