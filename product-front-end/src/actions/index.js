import axios from "axios";

const ROOT_URL = "http://localhost:8000";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const GET_COUNT = "GET_COUNT"

export function fetchProducts() {
  const url = `${ROOT_URL}/products`
  const request = axios.get(url, {headers: { "Content-Type" : "application/json"}})
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function getCount() {
  const url = `${ROOT_URL}/products/count`
  const request = axios.get(url, {headers: { "Content-Type" : "application/json"}})
  return {
    type: GET_COUNT,
    payload: request
  };
}
