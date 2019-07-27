import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_SORTER = 'ADD_SORTER';

//set up function that loads all posts with no specifications
export function fetchProducts() {
    const request = axios.get('http://localhost:8000/products')
    return {
        type: FETCH_PRODUCTS,
        payload: request
    }
}
//set up function that allows the user to add a sorter value
export function addSorter(data) {
    return {
        type: ADD_SORTER,
        payload: data
    }
}
//set up function that allows the user to add a category
export function addCategory(data) {
    return {
        type: ADD_CATEGORIES,
        payload: data
    }
}