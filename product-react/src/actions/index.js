import axios from 'axios';
export const CHANGE_CATEGORY = "change_category";
export const CHANGE_SORT = 'change_sort';
export const FETCH_PRODUCTS = 'fetch_products';
const ROOT_URL = 'http://localhost:8000'

export function setCategory(category){
    return {type: CHANGE_CATEGORY, payload: category}
}

export function setSort(sort){
    return {type: CHANGE_SORT, payload: sort}
}

export function submitQuery(category, sort){
    if(category == "Select Categories") {
        category = 'DISREGARD'
    }
    if(sort == 'Select Sort'){
        sort = 'DISREGARD'
    }
    let request = axios.get(`${ROOT_URL}/products?category=${category}&price=${sort}`);
        return {type: FETCH_PRODUCTS, payload: request};
}

