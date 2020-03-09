import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/products'

export const FETCH_PRODUCTS = 'fetch_products';

export function fetchProducts(category, price) {

    console.log(category)
    const url = `${ROOT_URL}${category}`;
    const request = axios.get(url);
    
    return {
      type: FETCH_PRODUCTS,
      payload: request
    };


}