import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const SORT_PREVIOUSLY_FETCHED_PRODUCTS = "SORT_PREVIOUSLY_FETCHED_PRODUCTS";
export const FILTER_PREVIOUSLY_FETCHED_PRODUCTS = "FILTER_PREVIOUSLY_FETCHED_PRODUCTS";

const generateQueryParamsString = options => {
    let queryParamsString = '';
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
    if(queryParamsString.length > 0) {
        queryParamsString = '?' + queryParamsString;
    }
    return queryParamsString;
}

export const fetchProducts = options => {
    const products = axios.get(`https:localhost:8000/products${generateQueryParamsString(options)}`).catch(error => {
        return null;
    });

    return {
        type: FETCH_PRODUCTS,
        payload: products
    };
}
export const sortPreviouslyFetchedProducts = direction => {
    return {
        type: SORT_PREVIOUSLY_FETCHED_PRODUCTS,
        payload: direction
    }
}

export const filterPreviouslyFetchedProductsByCategory = category => {
    return {
        type: FILTER_PREVIOUSLY_FETCHED_PRODUCTS,
        payload: category
    }
};