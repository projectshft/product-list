import axios from "axios";

//to-do: account for pagination
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

//may need async await here?
export function fetchProducts(price, category, query) {
  const request = axios.get(
    `http://localhost:8000/products?price=${price}&category=${category}&query=${query}`
  );
  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
}
