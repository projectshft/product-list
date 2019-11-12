import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";
export const SEARCH_PRODUCTS = "search_products";

const ROOT_URL = "http://localhost:8000/products";

export function fetchProducts() {
    const request = axios.get(ROOT_URL);
    console.log('action')
    return {
        type: FETCH_PRODUCTS,
        payload: request
    }
}

export function searchProducts(values) {
    const request = axios.get(`${ROOT_URL}?page=1&category=${values}`)
    console.log(request)
    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}