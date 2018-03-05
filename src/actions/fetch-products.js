import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export function fetchProducts(query, category, sortBy, page) {
    let url;
    if (!page) {
        page = 1;
    }

    query && category && sortBy && page ? url = `${ROOT_URL}/products?search=${query}&category=${category}&price=${sortBy}&page=${page}` :
    query && category && sortBy ? url = `${ROOT_URL}/products?search=${query}&category=${category}&price=${sortBy}` :
    query && category && page ? url = `${ROOT_URL}/products?search=${query}&category=${category}&page=${page}` :
    query && sortBy && page ? url = `${ROOT_URL}/products?search=${query}&price=${sortBy}&page=${page}` :
    query && category ? url = `${ROOT_URL}/products?search=${query}&category=${category}` :
    query && sortBy ? url = `${ROOT_URL}/products?search=${query}&price=${sortBy}` :
    query && page ? url = `${ROOT_URL}/products?search=${query}&page=${page}` :
    query ? url = `${ROOT_URL}/products?search=${query}` :
    category && sortBy && page ? url = `${ROOT_URL}/products?category=${category}&price=${sortBy}&page=${page}` :
    category && sortBy ? url = `${ROOT_URL}/products?category=${category}&price=${sortBy}` :
    category && page ? url = `${ROOT_URL}/products?category=${category}&page=${page}` :
    category ? url = `${ROOT_URL}/products?category=${category}` :
    sortBy && page ? url = `${ROOT_URL}/products?price=${sortBy}&page=${page}` :
    sortBy ? url = `${ROOT_URL}/products?price=${sortBy}` :
    page ? url = `${ROOT_URL}/products?page=${page}` :
    url = `${ROOT_URL}/products`

    const request = axios.get(url);

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}