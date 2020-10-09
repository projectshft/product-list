import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';

const ROOT_URL = 'http://localhost:8000/products';
let QUERY = '?page=';

// QUERY = QUERY + '1&category=Music&search=fantastic'
// initial fetch posts, should load the first 9 products on page load
export function fetchProducts(params) {

    console.log('new params are ' + params)
    console.log(params)

    // if parameter is passed, add to our url to update the request properly
    if (params !== undefined) {
        if (params.page) {
            const page = params.page;
            QUERY = QUERY + page;
        }
        if(params.searchTerm){
            const searchTerm = params.searchTerm;
            QUERY = QUERY + `&search=${searchTerm}`;
        }
        if(params.setCategory){
            const setCategory = params.setCategory;
            QUERY = QUERY + `&category=${setCategory}`;
        }
        if(params.sortChoice){
            const sortChoice = params.sortChoice;
            QUERY = QUERY + `&price=${sortChoice}`;
        }
    }
const request = axios.get(ROOT_URL + QUERY)

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}
