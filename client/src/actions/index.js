import axios from 'axios'
//decided to use axios for ease of use with fetch requests
const rootUrl = 'http://localhost:8000'

export default rootUrl;

//action creator for page display
export const GET_PRODUCTS = 'GET_PRODUCTS'

export function getProducts(params) {
  const request = axios.get(`${rootUrl}/api/products`, {params : params})
  return {
    type: GET_PRODUCTS,
    payload: request,
  }
}

//action creator for sort
export const SORT = 'SORT'

export function sort(param) {
  const request = axios.get(`${rootUrl}/api/products?sort=${param}`)
  return {
    type: SORT,
    payload: request
  }
}

//action create for filtering
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY'

export function filter(category) {
  const request = axios.get(`${rootUrl}/api/products?category=${category}`)
  return {
    type: FILTER_BY_CATEGORY,
    payload: request
  }
}
