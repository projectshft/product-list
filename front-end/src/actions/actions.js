import axios from 'axios'

import { GET_ALL_PRODUCTS, PAGE_NUM, NAME, CATEGORY, PRICE_TYPE} from './action-names'

// products?page=3&category=games&sort=highest&name=anynameformat

// gets products according to filter querys. If no querys will get all products starting from page 1
export const getProducts =  (pageNumber, name, category, priceType) => {
  return axios.get(`http://localhost:5000/products?page=${pageNumber}&name=${name}&category=${category}&sort=${priceType}`)
    .then(res => {  
      return {
        type: GET_ALL_PRODUCTS,
        payload: res
      }
    })
}

// change page action
export const getPage = (pageNum) => {
  return {
    type: PAGE_NUM,
    payload: pageNum
  }
}

// change name action
export const getName = (name) => {
  return {
    type: NAME,
    payload: name
  }
}

//change category action
export const getCategory = (category) => {
  return {
    type: CATEGORY,
    payload: category
  }
}

//change price type action
export const getPriceType = (priceType) => {
  return {
    type: PRICE_TYPE,
    payload: priceType
  }
}
