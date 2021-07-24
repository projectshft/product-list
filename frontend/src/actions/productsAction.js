import axios from "axios";

//variables
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

//action creators
export const loadProductsData = async (query) => {
  const ROOT_URL = "http://localhost:8000/products";
  console.log(query);

  const request = await axios.get(`${ROOT_URL}${query}`);
  console.log(request);

  return {
    type: FETCH_PRODUCTS,
    payload: request.data,
  };
};
