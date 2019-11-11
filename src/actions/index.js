import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

const API_URL = "http://localhost:8000";
export function fetchProducts(search) {
  const request = axios.get(`${API_URL}/products`).catch(function(error) {
    console.log("ERROR: ", error);
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}
