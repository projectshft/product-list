import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts(query) {

  let search = ""

  if (query.category) {
    search = `${search}&category=${query.category}`
  } 

  if (query.price) {
    search = `${search}&price=${query.price}`
  } 
  
  if (query.page) {
    search = `${search}&page=${query.page}`
  }

  let url = `${ROOT_URL}products?${search}`

  const productData = axios.get(url)
    .catch(function (error) {
      if (error) {
        console.log(error);
      }
    });
        console.log(productData)
    return {
      type: FETCH_PRODUCTS,
      payload: productData
  };
}
