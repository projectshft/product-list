import axios from "axios";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts(query, category, price, page) {
  const pages = () => {
    if (page) {
      return `&page=${page}`
    } else {
      return ''
    }
  }
  
  const categories = () => {
    if (category) {
      return `&category=${category}`
    } else {
      return ''
    }
  }

  const prices = () => {
    if (price) {
      return `&price=${price}`
    } else {
      return ''
    }
  }

  const queries = () => {
    if (query) {
      return `&query=${query}`
    } else {
      return ''
    }
  }

  const   url = `http://localhost:8000/products?`

  const response = axios.get(url+queries()+categories()+prices()+pages())
  return {
    type: FETCH_PRODUCTS,
    payload: response
  }
}