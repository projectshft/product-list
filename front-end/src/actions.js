import axios from 'axios'


export const GET_PRODUCTS = "GET_PRODUCT"


// gets the initial load 
export const getProducts =  (pageNumber, name, category, priceType) => {

  return axios.get(`http://localhost:5000/products?page=${pageNumber}&name=${name}&category=${category}&sort=${priceType}`)
    .then(res => {
      return {
        type: GET_PRODUCTS,
        payload: res
      }
    })
}
