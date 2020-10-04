import axios from 'axios';
// action for calling products via API
export const FETCH_PRODUCTS = 'fetch_products';

const ROOT_URL = 'http://localhost:8000/products';

export function fetchProducts(page, category, search) {
  // TODO separate quantity? (thinking this is a wasted call to db)
  const request = axios.get(
    `${ROOT_URL}?=${search}&page=${page}&category=${category}`
  );
console.log(request);
  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
}

//sent to reducers to fetch data
