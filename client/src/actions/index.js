import axios from 'axios'
//decided to use axios for ease of use with fetch requests
const rootUrl = 'http://localhost:8000'

export default rootUrl;

//action creator for page display
export const GET_PRODUCTS = 'GET_PRODUCTS'

export function getProducts(page, category, price) {
  const request = axios.get(`${rootUrl}/api/products`, {params: {
      page,
      category,
      price
    }
  })
  return {
    type: GET_PRODUCTS,
    payload: request,
  }
}

export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

export function updateCategory(category) {
  return {
    type: UPDATE_CATEGORY,
    payload: category
  }
}

export const UPDATE_PRICE = 'UPDATE_PRICE'

export function updatePrice(price) {
  return {
    type: UPDATE_PRICE,
    payload: price
  }
}

export const UPDATE_PAGE = 'UPDATE_PAGE'

export function updatePage(page) {
  return {
    type: UPDATE_PAGE,
    payload: page
  }
}

