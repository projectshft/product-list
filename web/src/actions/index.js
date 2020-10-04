import axios from 'axios';
// action for calling products via API
export const FETCH_PRODUCTS = 'fetch_products';

const ROOT_URL = 'http://localhost:8000/';

export function fetchProducts(page, category, id, search) {
  const request = axios.get(
    `${ROOT_URL}`
  );

  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
}

//sent to reducers to fetch data
