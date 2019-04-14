import axios from 'axios'
const rootUrl = 'http://localhost:8000'

export default rootUrl;

//action creator for page display
export const getProducts = 'Get-Products'

export function getProducts(page, category, price) {
  const request = axios.get(`${rootUrl}/api/products`, {params: {
      page,
      category,
      price
    }
  })
  return {
    type: getProducts,
    payload: request,
  }
}

export const getCategory = 'Get-Category'

export function getCategory(category) {
  return {
    type: getCategory,
    payload: category
  }
}

export const getPrice = 'Get-Price'

export function getPrice(price) {
  return {
    type: getPrice,
    payload: price
  }
}

export const refreshPage = 'Refresh-Page'

export function refreshPage(page) {
  return {
    type: refreshPAGE,
    payload: page
  }
}