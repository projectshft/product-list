import axios from 'axios';

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

let queryParams = {};

export function fetchProducts(search) {
  
  if (search.query) {
    queryParams.query = search.query
  }

  if (search.price) {
    queryParams.price = search.price
  }

  if (search.category) {
    queryParams.category = search.category
  }

  if (search.page) {
    queryParams.page = search.page
  }
  
  const request = axios.get('http://localhost:8000/products', {
    params: {
      query: queryParams.query,
      price: queryParams.price,
      category: queryParams.category,
      page: queryParams.page
    }
  })

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}