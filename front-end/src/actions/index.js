import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';

const ROOT_URL = 'http://localhost:8000/products';
let QUERY = '?page=';

// &category=
//&search=
//&price=

// QUERY = QUERY + '1&category=Music&search=fantastic'
// initial fetch posts, should load the first 9 products on page load
// TODO figure out params as an object, check pagaintion page and make sure that works right ,
export function fetchProducts(params) {

    console.log('new params are ' + params)
    console.log(params)

    // if parameter is passed, add to our url to update the request properly
    if (params != undefined) {
        if (params.page) {
            let page = params.page;
            QUERY = QUERY + page;
        }
        if(params.searchTerm){
            let searchTerm = params.searchTerm;
            QUERY = QUERY + searchTerm;
        }
        if(params.setCategory){
            let setCategory = params.setCategory;
            QUERY = QUERY + setCategory;
        }
        if(params.sortChoice){
            let sortChoice = params.sortChoice;
            QUERY = QUERY + sortChoice;
        }
    }
const request = axios.get(`${ROOT_URL}${QUERY}`)

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}
