import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

const API_URL = "http://localhost:8000";
export function fetchProducts(searchOptions) {
  let requestUrl = `${API_URL}/products`;

  let queries = [];

  if (searchOptions.query) {
    queries.push("query=" + searchOptions.query);
  }

  if (searchOptions.sort) {
    switch (searchOptions) {
      case "Price: Low to High":
        queries.push("price=lowest");
        break;
      case "Price: High to Low":
        queries.push("price=highest");
        break;
    }
  }

  if (searchOptions.page) {
    queries.push("page=" + searchOptions.page);
  }

  if (searchOptions.category) {
    queries.push("category=" + searchOptions.category);
  }

  if (queries.length > 0) {
    requestUrl += "?" + queries.join("&");
  }

  const request = axios.get(requestUrl).catch(function(error) {
    console.log("ERROR: ", error);
  });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}
