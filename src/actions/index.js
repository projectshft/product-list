import axios from 'axios'

const ROOT_URL = 'http://localhost:8000'
const FETCH_PRODUCTS = "fetch_products"
const SAVE_CATEGORY = 'save_category'

const fetchProducts = (pageNum = 1, category) => {
  let catQuery = ''
  if (category) {
    catQuery = `&category=${category}`
  }
  const req = axios.get(`${ROOT_URL}/products?page=${pageNum}${catQuery}`)
  return {
    type: FETCH_PRODUCTS,
    payload: req
  };
}

// Saves category in state to persist for different pages
const saveCurrentCategory = (categoryItem) => {
  debugger
  return {
    type: SAVE_CATEGORY,
    category: categoryItem
  }
}

export {FETCH_PRODUCTS, SAVE_CATEGORY, fetchProducts, saveCurrentCategory}