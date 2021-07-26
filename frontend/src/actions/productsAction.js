import axios from "axios";

//variables
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

//action creators
export const loadProductsData = async (query) => {
  const ROOT_URL = "http://localhost:8000/products";
  let request;

  if (query) {
    request = await axios.get(`${ROOT_URL}${query}`);
  } else {
    request = await axios.get(`${ROOT_URL}`);
  }

  return {
    type: FETCH_PRODUCTS,
    payload: request.data,
  };
};
