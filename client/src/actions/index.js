import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_SORTER = 'ADD_SORTER';
export const ADD_PAGE = 'ADD_PAGE'

//set up function that loads all posts with no specifications
export function fetchProducts (pageNumber,category, sort) {
    const request = axios.get(`http://localhost:8000/products/`, {
        params: {
            category: category,
            price: sort,
            page: pageNumber
        }
    })

    return {
        type: FETCH_PRODUCTS,
        payload: request
    }
}

//set up function that allows the user to add a price sorter query
export function addSorter(data) {
    return {
        type: ADD_SORTER,
        payload: data
    }
}
//set up function that allows the user to add a price sorter query
export function addCategory(data) {
    return {
        type: ADD_CATEGORIES,
        payload: data
    }
}
//set up function that allows the user to add a Page query
export function addPage (data) {
    return {
        type: ADD_PAGE,
        payload: data
    }
}

