import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';

const ROOT_URL = 'http://localhost:8000/products';
let QUERY = '?page=';

// &category=
//&search=
//&price=

// QUERY = QUERY + '1&category=Music&search=fantastic'
// initial fetch posts, should load the first 9 products on page load

export function fetchProducts(setPage, searchTerm,  setCategory, sortChoice) {
    // if parameter is passed, add to our url to update the request properly
    if(setPage) {
        QUERY = QUERY + setPage;
    }
    if(searchTerm){
        QUERY = QUERY + searchTerm;
    }
    if(setCategory){
        QUERY = QUERY + setCategory;
    }
    if(sortChoice){
        QUERY = QUERY + sortChoice;
    }
const request = axios.get(`${ROOT_URL}${QUERY}`)

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}
