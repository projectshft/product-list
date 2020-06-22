import axios from 'axios'

const ROOT_URL = "http://localhost:8000/products";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";


export function fetchProducts (page, category, sort, searchInput) {

    const url = `${ROOT_URL}?page=${page}?category=${category}?price=${sort}?query=${searchInput}`;
    const request = axios.get(url)
    console.log('Request', request);
    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}