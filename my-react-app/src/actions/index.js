import axios from "axios";

const ROOT_URL = `http://localhost:3000/`;

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts() {
    const request = axios.get(ROOT_URL);

    console.log('Request', request)

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}