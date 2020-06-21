import axios from "axios";

export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";

const ROOT_URL = `http://localhost:8000`;

export function searchProducts(searchTerm, category, sortStatus) {
  let url = `${ROOT_URL}/products`;

  const params = {
    searchTerm,
    category,
    sortStatus,
  };

  console.log("Arguments are", arguments);

  // if an argument was passed, we know to add the ?
  if (arguments.length > 0) {
    url += "?";

    if (params.searchTerm) {
      url += `query=${params.searchTerm}&`;
    }

    if (params.category) {
      url += `category=${params.category}&`;
    }

    if (params.sortStatus) {
      url += `sort=${params.sortStatus}&`;
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
