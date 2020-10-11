import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';

const ROOT_URL = 'http://localhost:8000/products';
let QUERY = '?';

// QUERY = QUERY + '1&category=Music&search=fantastic'
// initial fetch posts, should load the first 9 products on page load
export function fetchProducts(params) {

    console.log('new params are ' + params)
    console.log(params)

    // if parameter is passed, add to our url to update the request properly
    if (params !== undefined) {
        if (params.page) {
            const page = params.page;
            console.log('Page is ' + page);
            // if(QUERY.includes('&page=')){
            //     QUERY = QUERY.replace('&page=', '')
            //     QUERY = QUERY.replace(/\d+/g, '')
            //     console.log(`old query is:` + QUERY)
            // }
            QUERY = QUERY + `&page=${page}`;
        }
        if(params.search){
            const search = params.search;
            // if(QUERY.includes('&search=')){
            //     QUERY = QUERY.replace('&search=', '')
            //     console.log(`old query is:` + QUERY)
            // }
            QUERY = QUERY + `&search=${search}`;
        }
        if(params.category){
            const category = params.category;
            // if(QUERY.includes('&category=')){
            //     QUERY = QUERY.replace('&category=', '')
            //     console.log(`old query is:` + QUERY)
            // }
            QUERY = QUERY + `&category=${category}`;
        }
        if(params.sort){
            const sort = params.sort;
            // if(QUERY.includes('&price=')){
            //     QUERY = QUERY.replace('&price=', '')
            //     QUERY = QUERY.replace('highest', '')
            //     QUERY = QUERY.replace('lowest', '')
            //     console.log(`old query is:` + QUERY)
            // }
            QUERY = QUERY + `&price=${sort}`;
        }
    }
const request = axios.get(ROOT_URL + QUERY)
console.log(QUERY)
    return {
        type: FETCH_PRODUCTS,
        payload: request
        
    };
}
