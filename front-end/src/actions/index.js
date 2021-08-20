import axios from "axios";


export const FETCH_PRODUCT = "FETCH_PRODUCT";

// return 9 products from API
export function fetchProduct(urlAdditions) {
  let ROOT_URL = 'http://localhost:8000/products';

  ROOT_URL += urlAdditions;

  console.log('in fetchProduct, ROOT_URL is this after urlAdditions: ' + ROOT_URL);

  const request = axios.get(`${ROOT_URL}`);

  return {
    type: FETCH_PRODUCT,
    payload: request,
  };
}



