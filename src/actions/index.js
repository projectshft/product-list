import axios from 'axios'

const ROOT_URL = 'http://localhost:8000'
const FETCH_PRODUCTS = "fetch_products"

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

export {FETCH_PRODUCTS, fetchProducts}