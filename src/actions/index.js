import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts(query, category, sortBy, page) {
    let url;
    query && category && sortBy ? url = `${ROOT_URL}/products?search=${query}&category=${category}&price=${sortBy}` :
    query && category ? url = `${ROOT_URL}/products?search=${query}&category=${category}` :
    query && sortBy ? url = `${ROOT_URL}/products?search=${query}&price=${sortBy}` :
    query ? url = `${ROOT_URL}/products?search=${query}` :
    category && sortBy ? url = `${ROOT_URL}/products?category=${category}&price=${sortBy}` :
    category ? url = `${ROOT_URL}/products?category=${category}` :
    sortBy ? url = `${ROOT_URL}/products?price=${sortBy}` :
    url = `${ROOT_URL}/products`

    const request = axios.get(url);

    console.log('Request', request);

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}