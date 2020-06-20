export const FILTER_PRODUCTS = "FILTER_PRODUCTS";

export function filterProducts(term) {
  const request = "";

  request.then(console.log("HI!!!!"));

  return {
    type: FILTER_PRODUCTS,
    payload: request,
  };
}
