export const GET_PRODUCTS = "GET_PRODUCTS"

const ROOT_URL = 'http://localhost:8000/'

export const fetchProducts = (query) => {
  const request = fetch(ROOT_URL+query)

  return {
    type: GET_PRODUCTS,
    payload: request
  }
}

