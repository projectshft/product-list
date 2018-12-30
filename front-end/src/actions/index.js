import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";
export const UPDATE_PARAMS = "update_params";

const ROOT_URL = "http://localhost:8000/products";

export function fetchProducts(params) {
  const request = axios.get( ROOT_URL, { params: params } );

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function updateParams(params) {
   return {
      type: UPDATE_PARAMS,
      payload: params
   };
}