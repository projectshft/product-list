import axios from 'axios'

export const FETCH_PRODUCTS = "fetch_products";
export const SAVE_CATEGORY = "fetch_category";
export const SORT_PRICE = "sort_price"

const baseURL = "http://localhost:8000";


export const fetchProducts = (page, category = "", sort = "") => {

    const url = `${baseURL}/products?page=${page}${category}&price=${sort}`;
    const request = axios.get(url)
    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}

export const selectedCategory = (category) => {
    return {
        type: SAVE_CATEGORY,
        payload: category
    }
}


export function sortPrice(price) {

    return {
        type: SORT_PRICE,
        payload: price
    };
}