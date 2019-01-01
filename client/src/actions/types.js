import { request } from "http";

export const GENERATE_FAKE_DATA = 'FETCH_FAKE_DATA';

export function generateFakeData() {
  fetch('/api/generate-fake-data')
  return function(dispatch) {
  fetch('/api/allproducts')
    .then(res =>res.json())
    .then(totalProducts => dispatch ({
      type: GENERATE_FAKE_DATA,
      payload: totalProducts
    }))
  }
}

export const DISPLAY_CURRENT_PRODUCTS = 'DISPLAY_CURRENT_PRODUCTS';

export function displayCurrentProducts(page) {
  let result = fetch(`api/products?page=${page}`)
  return {
    type: DISPLAY_CURRENT_PRODUCTS,
    payload: result
  }
}

export const SORT = 'SORT'
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY'

// generateFakeData : function() {
//   fetch('/api/generate-fake-data')