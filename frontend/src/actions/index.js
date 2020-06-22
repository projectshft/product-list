import axios from 'axios';

const ROOT_URL = `http://localhost:8000/products`

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts(category, price, search, pagination) {
  if (category || price || search || pagination) {
    let url = `${ROOT_URL}?`
    if (category) {
      url = url + `&category=${category}`
    }
    if (price) {
      url = url + `&price=${price}`
    }
    if (search) {
      url = url + `&query=${search}`
    }
    if (pagination) {
      url = url + `&page=${pagination}`
    }
    let request = axios.get(url)

    return {
      type: FETCH_PRODUCTS,
      payload: request
    };
  } else {
    let url = ROOT_URL
    let request = axios.get(url)
    return {
      type: FETCH_PRODUCTS,
      payload: request
    };
  }
};
