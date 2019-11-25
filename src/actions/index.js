import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";
export const SEARCH_PRODUCTS = "search_products";

const ROOT_URL = "http://localhost:8000/products";

//This api call fetches all the products through the "/products" route 
export function fetchProducts(category, sort, page) {
    const request = axios.get(ROOT_URL, {
        params: {
            category: category,
            price: sort,
            page: page
        }
    });
    console.log('request', request)

    return {
        type: FETCH_PRODUCTS,
        payload: request
    }
}


//This api call fetches all categories based on the query the user searches for in search bar 
export function searchProducts(values) {
    const request = axios.get(`${ROOT_URL}?page=1&category=${values}`)

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}