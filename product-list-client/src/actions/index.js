import axios from 'axios'

const ROOT_URL = "http://localhost:8000/products";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";


export function fetchProducts (query = {}, searchInput) {

    let pageSort = "";
    let categoryTerm = "";
    let searchTerm = "";
    let priceSort = "";
    
    if (query.page) {
        pageSort = query.page;
    }

    if (query.category) {
        categoryTerm = query.category;
    }

    if (query.price) {
        priceSort = query.price
    }

    if (searchInput) {
        searchTerm = searchInput;
    }


    let url = `${ROOT_URL}?page=${pageSort}&category=${categoryTerm}&price=${priceSort}&search=${searchTerm}`;
    const request = axios.get(url)
    console.log('Request', request);
    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}