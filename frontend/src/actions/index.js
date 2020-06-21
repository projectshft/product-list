import axios from "axios";
import { withRouter } from "react-router";
import queryString from "query-string";

export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const STORE_PAGE = "STORE_PAGE";

const ROOT_URL = `http://localhost:8000`;

export function filterProducts(queries) {
  let url = `${ROOT_URL}/products`;

  const request = "";

  return {
    type: FILTER_PRODUCTS,
    payload: request,
  };
}

export function searchProducts(
  page,
  searchTerm,
  category,
  sortStatus,
  searchPath
) {
  let url = `${ROOT_URL}/products`;
  const parsed = queryString.parse(searchPath);
  console.log("parsed is", parsed);

  const params = {
    page,
    searchTerm,
    category,
    sortStatus,
  };

  console.log("params object is ", params);

  // if an argument was passed, we know to add the ?
  if (arguments.length > 0) {
    url += "?";

    if (params.page) {
      url += `page=${params.page}&`;
    }

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

// useful for just telling other parts of app what page we are on
export function storePage(page) {
  const request = page;

  return {
    type: STORE_PAGE,
    payload: request,
  };
}
