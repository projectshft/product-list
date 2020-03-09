import axios from 'axios'

export const FETCH_PRODUCTS = "fetch_products";
export const SAVE_CATEGORY = "fetch_category";

const baseURL = "http://localhost:8000";


export const fetchProducts = (page = 1, category, sort) => {
    let categoryQuery = ''
    if (category) {
        categoryQuery = `&category=${category}`
    }
    const req = axios.get(`${baseURL}/products?page=${page}${categoryQuery}&price=${sort}`)
    return {
        type: FETCH_PRODUCTS,
        payload: req
    };
}

export const selectedCategory = (category) => {
    return {
        tpe: SAVE_CATEGORY,
        payload: category
    }
}