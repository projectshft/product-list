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
    const request = axios.get(`http://localhost:8000/products/?category=${category}`)
    return {
        type: FETCH_CATEGORIES,
        payload: request
    }
} 
export function fetchSort (sort) {
    const request = axios.get(`http://localhost:8000/products/?price=${sort}`)
    return {
        type: FETCH_SORT,
        payload: request
    }
}

export function fetchCategoriesAndSort (category, sort) {
    const request = axios.get(`http://localhost:8000/products/?category=${category}&price=${sort}`)
    return {
        type: FETCH_CATEGORIES_AND_SORT,
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