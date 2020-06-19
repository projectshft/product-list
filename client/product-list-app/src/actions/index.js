import axios from "axios";

// server address
const ROOT_URL = 'localhost:8000/products';

export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";

export function searchProducts(searchParams) {
  const url = ROOT_URL;
  const params = searchParams;
  const request = axios.get(url, { params: params });

  request.then(console.log("HI!!!!"));

  return {
    type: SEARCH_PRODUCTS,
    payload: request,
  };
}

