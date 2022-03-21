import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const SET_QUERY = "SET_QUERY";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_PRICE = "SET_PRICE";

const ROOT_URL = "http://localhost:8000/";

export function fetchProducts(query, category, price, page) {
  
  let url = `${ROOT_URL}products`

  if (query || category || price || page) {
    url += `?`
  }
  if (query) {
    url += `query=${query}&`;
  }
  if (category) {
    url += `category=${category}&`;
  }
  if (price) {
    url += `price=${price}&`;
  }
  if (page) {
    url += `page=${page}&`;
  }

  const request = axios.get(url);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function setQueryFilter(value) {
  return {
    type: SET_QUERY,
    payload: value
  };
}

export function setCategoryFilter(value) {
  return {
    type: SET_CATEGORY,
    payload: value
  };
}
export function setPriceFilter(value) {
  return {
    type: SET_PRICE,
    payload: value
  };
}
