import axios from "axios";

const ROOT_URL = "http://localhost:8000/products";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";


export function fetchProducts() {
  const url = `${ROOT_URL}`;  //edit here for queries
  const request = axios.get(url); //a promise

  console.log('Request', request);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}