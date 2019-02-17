//fetch initial list of ALL products for store AND display 1st 9
import axios from "axios";
const ROOT_URL = "http://localhost:8000";

//get initial set of products
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCTS_FAIL = "FETCH_PRODUCTS_FAIL";

export async function fetchProducts() {
    try {
        const request = await axios.get(`${ROOT_URL}/products`);

        console.log('Request fetchProducts: ', request);

        return {
            type: FETCH_PRODUCTS,
            payload: request
        };
    } catch (error) {
        return {
            type: FETCH_PRODUCTS_FAIL,
            payload: error
        }
    }
}



export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
// export const DECREMENT = "DECREMENT";
export const FAIL = "FAIL";

export async function setCurrentPage(page) {
    console.log('action page:', page)
    try {
        const request = await axios.get(`${ROOT_URL}/products?page=${page}`);
    
        console.log('Request setCurrentPage: ', request);
        return {
            type: SET_CURRENT_PAGE,
            payload: request
    };
    } catch (error) {
        return {
            type: FAIL,
            payload: error
        }
    } 
}

//when 'previous' clicked, decrease page by 1 and get those products
export const DECREMENT = "DECREMENT";
export async function decrement(page) {
    try {
        const request = await axios.get(`${ROOT_URL}/products?page=${page}`);

        return {
            type: DECREMENT,
            payload: request
        };
    } catch (error) {
        return {
            type: FAIL,
            payload: error
        }
    }
}

//when 'next' clicked, decrease page by 1 and get those products
export const INCREMENT = "INCREMENT";
export async function increment(page) {
    try {
        const request = await axios.get(`${ROOT_URL}/products?page=${page}`);

        return {
            type: INCREMENT,
            payload: request
        };
    } catch (error) {
        return {
            type: FAIL,
            payload: error
        }
    }
}

//when category selected, display the 1st set of 9 products that match
//when sort selected, re-order the store AND display the 1st set of 9