import axios from "axios";

const ROOT_URL = `http://localhost:8000/products`;

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

//this function is added to the product-list component and called when the component mounts so that the data is passed to that component
export function fetchProducts() {
  const request = axios.get(ROOT_URL);

  console.log('Requested Data:', request)

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

//request is the promise - doesn't initially contain data
//to see what data is returned -- look in reducers