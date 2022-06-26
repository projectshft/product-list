import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
const generateQueryParamsString = options => {
    let queryParamsString = '?';
    if(options.category) {
        queryParamsString = queryParamsString.concat('category=', options.category);
    }
    if(options.sort) {
        if(queryParamsString.length > 0) {
            queryParamsString += '&';
        }
        queryParamsString = queryParamsString.concat('sort=', options.sort);
    }
    if(options.query) {
        if(queryParamsString.length > 0) {
            queryParamsString += '&';
        }
        queryParamsString = queryParamsString.concat('query=', options.query);
    }
    queryParamsString += `${queryParamsString.length > 1 ? '&' : ''}page=${options.page}`;
    return queryParamsString;
}

export const fetchProducts = options => {
    const response = axios.get(`http://localhost:8000/products${generateQueryParamsString(options)}`).catch(error => {
        console.log('there was an error processing the GET request');
        return null;
    });

    return {
        type: FETCH_PRODUCTS,
        payload: response
    };
}
