import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const FETCH_PRODUCT = "FETCH_PRODUCT";

export function fetchProduct(id) {
    let url = `${ROOT_URL}/products/${id}`

    const request = axios.get(url);

    return {
        type: FETCH_PRODUCT,
        payload: request
    }
}