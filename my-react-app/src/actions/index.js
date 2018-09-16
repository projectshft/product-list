import axios from "axios";

const ROOT_URL = `http://localhost:4000/products`;

export const FETCH_PRODUCT = "FETCH_PRODUCT";

export function fetchProduct() {
    const request = axios.get(ROOT_URL);

    console.log('Request', request)

    return {
        type: FETCH_PRODUCT,
        payload: request
    };
}