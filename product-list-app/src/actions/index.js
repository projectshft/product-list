const axios = require('axios');

const ROOT_URL = `http://localhost:3000/products`;

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts() {
    const fetchRequest = axios.get(ROOT_URL);
    console.log('Request', fetchRequest)

    return {
        type: FETCH_PRODUCTS,
        payload: fetchRequest
    };
}