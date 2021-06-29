import axios from 'axios'

import { GET_ALL_PRODUCTS, PAGE_NUM, NAME, CATEGORY, PRICE_TYPE} from './action-names'



// gets the initial load 
export const getProducts =  (pageNumber, name, category, priceType) => {
  return axios.get(`http://localhost:5000/products?page=${pageNumber}&name=${name}&category=${category}&sort=${priceType}`)
    .then(res => {  
      return {
        type: GET_ALL_PRODUCTS,
        payload: res
      }
    })
}
// products?page=3&category=games&sort=highest&name=anynameformat
export const getPage = (pageNum) => {
  return {
    type: PAGE_NUM,
    payload: pageNum
  }
}

export const getName = (name) => {
  return {
    type: NAME,
    payload: name
  }
}

export const getCategory = (category) => {
  return {
    type: CATEGORY,
    payload: category
  }
}

export const getPriceType = (priceType) => {
  return {
    type: PRICE_TYPE,
    payload: priceType
  }
}
