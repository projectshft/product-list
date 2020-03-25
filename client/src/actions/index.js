import axios from 'axios'

export const FETCH_PRODUCTS = "fetch_products";

const baseURL = "http://localhost:8000/products?";


export function fetchProducts (page, category, sort, searchInput) {

    const url = `${baseURL}&${page}&${category}&${sort}&${searchInput}`;
    const request = axios.get(url)
    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}

