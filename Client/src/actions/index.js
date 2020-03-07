import axios from 'axios';

const ROOT_URL = 'http://localhost8000'

// export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
// export const GET_DATA_FAILURE = 'GET_DATA_FAILURE';
// export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts () {
  const url = `${ROOT_URL}/products`;
  const request = axios.get(url);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}
