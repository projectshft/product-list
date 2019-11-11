import axios from 'axios'

const ROOT_URL = 'http://localhost:8000'
const FETCH_PRODUCTS = "fetch_products"

const fetchProducts = (pageNum = 1) => {
  const req = axios.get(`${ROOT_URL}/products?page=${pageNum}`)
  return {
    type: FETCH_PRODUCTS,
    payload: req
  };
}

export {FETCH_PRODUCTS, fetchProducts}