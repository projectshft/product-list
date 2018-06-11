import axios from "axios";
const APIKey = '88312679-04c9-4351-85ce-3ed75293b449';
const ROOT_URL = 'http://localhost:8000';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts(requestConfig, pageRequest){
    const url = `${ROOT_URL}/products`;

    const config = {
        query: requestConfig.query,
        category: requestConfig.category,
        price: requestConfig.sortPrice || null,
        page: pageRequest || 1
    };

    const headersConfig = {
        'x-authentication': APIKey
    }
    
    const request = axios({url: url, headers: headersConfig, method: 'get', params: config})
                    .catch(error => {return error})
    return {type: FETCH_PRODUCTS, payload: request}
}