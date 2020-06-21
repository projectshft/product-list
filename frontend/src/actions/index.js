import axios from "axios";
import { withRouter } from "react-router";
import queryString from "query-string";

export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const STORE_PAGE = "STORE_PAGE";

const ROOT_URL = `http://localhost:8000`;

export function filterProducts(existingSearchQueryPath, newParams) {
  // existingSearchQueryPath is from this.props.location.search

  let appendToUrl = "/products";

  console.log("newParams are", newParams);

  // if any queries were passed, we'll filter
  if (newParams) {
    // break up the existing search query path
    const parsed = queryString.parse(existingSearchQueryPath);

    // merge newParams with existingSearchQueryPath
    const merged = { ...parsed, ...newParams };

    // turn that merged object into a query
    const stringifiedQuery = queryString.stringify(merged);

    console.log("stringifiedQuery in action is ", stringifiedQuery);
    appendToUrl += `?${stringifiedQuery}`;
  }

  const request = axios.get(ROOT_URL + appendToUrl);
  request.then(console.log("request is", request));
  request.then(console.log("request is", request));

  return {
    type: FILTER_PRODUCTS,
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
