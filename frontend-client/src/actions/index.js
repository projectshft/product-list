import axios from "axios";
export const INITIAL_PRODUCTS_FETCH = "INITIAL_PRODUCTS_FETCH";

export const fetchInitialProducts = () => {
  debugger;
  const url = `http://localhost:8000/products`
  const request = axios.get(url);
  return {
    type: INITIAL_PRODUCTS_FETCH,
    payload: request
  }
}