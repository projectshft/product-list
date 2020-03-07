import axios from 'axios';

const ROOT_URL = 'http://localhost8000/'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts(query) {

  let search = ""

  if (query.category && query.price) {
    search = `${search}category=${query.category}&price=${query.price}`
  } else if (query.category) {
    search = `${search}category=${query.category}`
  } else if (query.price) {
    search = `${search}price=${query.price}`
  }

  let url = `${ROOT_URL}products?${search}`

  const productList = axios.get(url)
    .catch(function (error) {
      if (error) {
        alert(error);
      }
    });
    return {
      type: FETCH_PRODUCTS,
      payload: productList
  };
}
