import axios from 'axios'
export const GET_PRODUCTS = "GET_PRODUCTS"
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID"
export const SEARCH = "SEARCH"
const apiBaseUrl = 'http://localhost:8000'

const getProducts = async (params) => {
  const query = await axios.get(`${apiBaseUrl}/products?search=${params.searchTerm}&category=${params.category}&price=${params.priceSort}&page=${params.page || 1}`)
  const searchTerm = params
  const productsArray = query.data.docs
  const totalDocs = query.data.totalDocs
  const totalPages = query.data.totalPages
  const currentPage = query.data.page
  const productsObj = {productsArray, totalDocs, totalPages, currentPage, searchTerm}
  return{
    type: GET_PRODUCTS,
    payload: productsObj
  }
}

const getProductById = async (params) =>{
  const query = await axios.get(`${apiBaseUrl}/products/${params}`)
  return{
    type: GET_PRODUCT_BY_ID,
    payload: query
  }
}

const search = (query) => {
  return{
    type: SEARCH,
    return: query
  }
}

export {getProducts, getProductById, search}