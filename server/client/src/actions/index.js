import axios from "axios";

// server address
const ROOT_URL = '/api';

export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const GET_RANDOM_DATA = "GET_RANDOM_DATA";

export function searchProducts(searchParams) {
  const url = `${ROOT_URL}/products`;
  const params = searchParams;
  const request = axios.get(url, { params: params });

  request.then(console.log("HI!!!!"));

  return {
    type: SEARCH_PRODUCTS,
    payload: request,
  };
}

export function getRandomData(callback) {
  const url = `${ROOT_URL}/generate-fake-data`;
  const request = axios.get(url);

  request.then((response) => {
    console.log("GET FAKE DATA RESPONSE", response);
    callback()
  })

  return {
    type: GET_RANDOM_DATA,
    payload: request,
  };
}

