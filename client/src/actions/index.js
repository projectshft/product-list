import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/products'

export const FETCH_PRODUCTS = 'fetch_products';

export function fetchProducts() {
    const url = `${ROOT_URL}`;
    const request = axios.get(url);
    
    return {
      type: FETCH_PRODUCTS,
      payload: request
    };
}

export const FETCH_PRODUCTS_BY_CATEGORY = 'fetch_products_by_category';

export function fetchProductsByCategory(category) {

    console.log(category)
    const url = `${ROOT_URL}${category}`;
    const request = axios.get(url);
    
    return {
      type: FETCH_PRODUCTS,
      payload: request
    };
}

export const FETCH_PRODUCTS_BY_NAME = 'fetch_products_by_name';

export function fetchProductsByName(name) {

    const url = `${ROOT_URL}?${name}`;
    const request = axios.get(url);
    
    return {
      type: FETCH_PRODUCTS_BY_NAME,
      payload: request
    };
}

export const FETCH_PRODUCTS_BY_PRICE = 'fetch_products_by_price';

export function fetchProductsByPrice(price) {

    const url = `${ROOT_URL}?page=1&price=${price}`;
    const request = axios.get(url);
    
    return {
      type: FETCH_PRODUCTS_BY_NAME,
      payload: request
    };
}