import axios from "axios";

export const FETCH_CATEGORY = "fetch_category";
export const FETCH_PRODUCTS = "fetch_products";
// export const FETCH_PRICE = "fetch_price";
// export const FETCH_PAGE

const ROOT_URL = "http://localhost:8000/products";

export function fetchCategory(category) {
  const url = `${ROOT_URL}?page=1&category=${category}`
  const request = axios.get(url)

 
  return {
    type: FETCH_CATEGORY,
    payload: request
  };
}

export function fetchProducts() {
  const url = `${ROOT_URL}?page=1`
  const request = axios.get(url)


  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}
