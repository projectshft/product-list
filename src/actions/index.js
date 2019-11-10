import axios from 'axios'

const ROOT_URL = 'localhost:8000'
const FETCH_PRODUCTS = "fetch_posts"

fetchProducts = () => {
  const req = axios.get(`${ROOT_URL}/products`)

  return {
    type: FETCH_PRODUCTS,
    payload: req
  }
}

export {FETCH_PRODUCTS, fetchProducts}