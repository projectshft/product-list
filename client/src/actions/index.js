import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_SORT = 'FETCH_SORT'
export const FETCH_CATEGORIES_AND_SORT = 'FETCH_CATEGORIES_AND_SORT'
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
export function fetchCategories (category) {
    console.log(category)
} 
export function fetchSort (sort) {
    console.log(sort)
}

export function fetchCategoriesAndSort (category, sort) {
    console.log(category, sort)
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