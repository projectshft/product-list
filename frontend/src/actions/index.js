export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const FILTER_CATEGORY = "FILTER_CATEGORY";
export const SORT_PRODUCTS = "SORT_PRODUCTS";

export function searchProducts(term) {
  const request = "";

  request.then(console.log("HI!!!!"));

  return {
    type: SEARCH_PRODUCTS,
    payload: request,
  };
}

export function filterCategory(term) {
  const request = "";

  request.then(console.log("HI!!!!"));

  return {
    type: FILTER_CATEGORY,
    payload: request,
  };
}

export function sortProducts(term) {
  const request = "";

  request.then(console.log("HI!!!!"));

  return {
    type: SORT_PRODUCTS,
    payload: request,
  };
}
