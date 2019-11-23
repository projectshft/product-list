import axios from "axios";

export const FETCH_PRODUCTS = 'fetch_products';
export const CHANGE_CATEGORY = 'change_category';
export const CHANGE_SORT = 'change_sort';

const ROOT_URL = 'http://localhost:8000/products';

export function fetchProducts(sort, page, category) {
    console.log('an action')
    console.log(sort);
    console.log(page);
    console.log(category);
    
    const request = axios
        .get(`${ROOT_URL}?price=${sort}&page=${page}&category=${category}`)
        .catch(function(error){
            console.log('error: ', error);
        });
        console.log(sort);
        console.log(page);
        console.log(category);
        console.log(request);
    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
};

export function changeCategory(category) {
    console.log(category)
    return {
        type: CHANGE_CATEGORY,
        payload: category
    };
};

export function changeSort(sort) {
    console.log(sort);
    return {
        type: CHANGE_SORT,
        payload: sort
    };
};