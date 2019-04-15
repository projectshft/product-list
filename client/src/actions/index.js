import axios from 'axios'

export const FETCH_PRODUCTS = 'fetch_products'
export const FILTER_CATEGORY = 'filter_category'
export const PAGINATE_PRODUCTS = 'paginate_products'

const ROOT_URL = 'http://localhost:8000/products'

export function fetchProducts() {
  const request = axios.get(`${ROOT_URL}`)

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}
export function filterCategory(id) {
  const request = axios.get(`${ROOT_URL}?category=${id}`)
  return {
    type: FILTER_CATEGORY,
    payload: request
  }
}
export function paginateProducts(id) {
  const request = axios.get(`${ROOT_URL}?page=${id}`)
  return {
    type: PAGINATE_PRODUCTS,
    payload: request
  }
}
