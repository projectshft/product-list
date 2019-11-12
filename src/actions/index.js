import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";
export const FETCH_CATEGORIES = "fetch_categories";
export const SET_CATEGORY = "set_category";
export const SET_SORT = "set_sort";

const API_URL = "http://localhost:8000";

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    payload: category
  };
}

export function setSort(sort) {
  return {
    type: SET_SORT,
    payload: sort
  };
}

export function fetchProducts(searchOptions) {
  let requestUrl = `${API_URL}/products`;

  let queries = [];

  if (searchOptions.query) {
    queries.push("query=" + searchOptions.query);
  }

  switch (searchOptions.sort) {
    case "price:low":
      queries.push("price=lowest");
      break;
    case "price:high":
      queries.push("price=highest");
      break;
    default:
      break;
  }

  if (searchOptions.page && searchOptions.page > 1) {
    queries.push("page=" + searchOptions.page);
  }

  if (searchOptions.category) {
    queries.push("category=" + searchOptions.category);
  }

  //append queries if any
  if (queries.length > 0) {
    requestUrl += "?" + queries.join("&");
  }

  console.log(requestUrl);
  const request = axios.get(requestUrl).catch(function(error) {
    console.log("ERROR: ", error);
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function fetchCategories() {
  let requestUrl = `${API_URL}/categories`;

  const request = axios.get(requestUrl).catch(function(error) {
    console.log("ERROR: ", error);
  });

  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}
