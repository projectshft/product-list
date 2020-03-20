import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/products'

export const FETCH_PRODUCTS = 'fetch_products';

export function fetchProducts(productSearch) {
  if(productSearch === undefined){
    const url = `${ROOT_URL}`;
    const request = axios.get(url);

    return {
      type: FETCH_PRODUCTS,
      payload: request
    };
  }else {
    const url = `${ROOT_URL}${productSearch}`;
    const request = axios.get(url);

    return {
      type: FETCH_PRODUCTS,
      payload: request
    };
  }

}

