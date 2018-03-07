import axios from 'axios'

export const FETCH_PRODUCTS = 'fetch_products'
export const FETCH_PRODUCTS_COUNT = 'fetch_products_count'
export const FETCH_PRODUCTS_CATEGORIES = 'fetch_product_categories'
export const UPDATE_PAGE_NUMBER = 'update_page_number'
export const UPDATE_CATEGORY_FILTER = 'update_category_filter'
export const UPDATE_SORT_BY_PRICE = 'update_sort_by_price'
export const UPDATE_SEARCH_QUERY = 'update_search_query'

const ROOT_URL = 'http://localhost:8000'

export function fetchProducts (parameters) {
  const request = axios.get(`${ROOT_URL}/products`, {
    params: parameters
  })

  return {
    type: FETCH_PRODUCTS,
    payload: request
  }
}

export function fetchProductsCount (parameters) {
  const request = axios.get(`${ROOT_URL}/products-count`, {
    params: parameters
  })

  return {
    type: FETCH_PRODUCTS_COUNT,
    payload: request
  }
}

export function fetchProductsCategories () {
  const request = axios.get(`${ROOT_URL}/products-categories`)

  return {
    type: FETCH_PRODUCTS_CATEGORIES,
    payload: request
  }
}

export function updatePageNumber (pageNumber) {
  return {
    type: UPDATE_PAGE_NUMBER,
    payload: pageNumber
  }
}

export function updateCategoryFilter (categoryFilter) {
  return {
    type: UPDATE_CATEGORY_FILTER,
    payload: categoryFilter
  }
}

export function updateSortByPrice (sortByPrice) {
  return {
    type: UPDATE_SORT_BY_PRICE,
    payload: sortByPrice
  }
}

export function updateSearchQuery (searchQuery) {
  return {
    type: UPDATE_SEARCH_QUERY,
    payload: searchQuery
  }
}
