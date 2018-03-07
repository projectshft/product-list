import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts(query, category, sortBy, page) {
    let url;
    // default to page = 1 if no page is present in function call
    if (!page) {
        page = 1;
    }

    // define url based on parameters passed into function
    query && category && sortBy ? url = `${ROOT_URL}/products?search=${query}&category=${category}&price=${sortBy}&page=${page}` :
    query && category ? url = `${ROOT_URL}/products?search=${query}&category=${category}&page=${page}` :
    query && sortBy ? url = `${ROOT_URL}/products?search=${query}&price=${sortBy}&page=${page}` :
    query ? url = `${ROOT_URL}/products?search=${query}&page=${page}` :
    category && sortBy ? url = `${ROOT_URL}/products?category=${category}&price=${sortBy}&page=${page}` :
    category ? url = `${ROOT_URL}/products?category=${category}&page=${page}` :
    sortBy ? url = `${ROOT_URL}/products?price=${sortBy}&page=${page}` :
    url = `${ROOT_URL}/products?page=${page}`

    const request = axios.get(url);

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}