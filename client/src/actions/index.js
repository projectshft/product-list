import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

const ROOT_URL = "http://localhost:8000";

export function fetchProducts(page = 1, category, price) {
  const request = axios.get(`${ROOT_URL}/products`, {
    params: {
      page: page,
      category: category,
      price: price
    }
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

