import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS';

export function fetchAllProducts() {
    let url = `${ROOT_URL}/products`;

    const request = axios.get(url);

    return {
        type: FETCH_ALL_PRODUCTS,
        payload: request
    }
}