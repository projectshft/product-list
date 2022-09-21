import axios from 'axios'
export const GET_PRODUCTS = "GET_PRODUCTS"
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID"
export const DELETE_PRODUCT_BY_ID = "DELETE_PRODUCT_BY_ID"
export const ADD_NEW_PRODUCT = "ADD_NEW_PRODUCT"
export const SEARCH = "SEARCH"
const apiBaseUrl = 'http://localhost:8000'

const getProducts = async (params) => {
  console.log(params)
  const query = await axios.get(`${apiBaseUrl}/products?search=${params.searchTerm}&category=${params.category}&price=${params.priceSort}`)
  const productsArray = query.data.docs
  const totalDocs = query.data.totalDocs
  const totalPages = query.data.totalPages
  const currentPage = query.data.page
  const productsObj = {productsArray, totalDocs, totalPages, currentPage}
  console.log(productsObj)
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

const deleteProductById = () => {
  return{
    type: DELETE_PRODUCT_BY_ID
  }
}

const addNewProduct = () => {
  return{
    type: ADD_NEW_PRODUCT
  }
}

const search = () => {
  return{
    type: SEARCH
  }
}

export {getProducts, getProductById, deleteProductById, addNewProduct, search}