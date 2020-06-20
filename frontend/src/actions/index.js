import axios from "axios";

export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";

const ROOT_URL = `http://localhost:8000`;

export function searchProducts(input) {
  let url = `${ROOT_URL}/products`;

  console.log("input is", input);

  // if there is any input to filter, we need to get the URL ready
  if (input) {
    url = url + "?";

    if (input.searchTerm) {
      url += `query=${input.searchTerm}`;
    }
  }

  console.log("url is ", url);

  const request = axios.get(url);
  request.then(console.log("request is", request));

  return {
    type: SEARCH_PRODUCTS,
    payload: request,
  };
}
