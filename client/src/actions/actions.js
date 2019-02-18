//fetch initial list of ALL products for store AND display 1st 9
import axios from "axios";
const ROOT_URL = "http://localhost:8000/products";

//get initial set of products
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCTS_FAIL = "FETCH_PRODUCTS_FAIL";
export async function fetchProducts() {
    try {
        const request = await axios.get(`${ROOT_URL}`);

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


//when page number clicked, set page
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const FAIL = "FAIL";
export function setCurrentPage(page) {
    return {
        type: SET_CURRENT_PAGE,
        page
    };
}

//when 'previous' clicked, decrease page by 1 and get those products
export const DECREMENT = "DECREMENT";
export async function decrement(page) {
    return {
        type: DECREMENT,
        page
    };
}

//when 'next' clicked, decrease page by 1 and get those products
export const INCREMENT = "INCREMENT";
export async function increment(page) {
    return {
        type: INCREMENT,
        page
    };
}

export const FETCH_PRODUCTS_BY_PAGE = "FETCH_PRODUCTS_BY_PAGE";
export async function fetchProductsByPage(page) {
    return () => {
        
        try {
            //Note that when you paginate after filtering by category, your filter should persist.
            // if (category === undefined) {
                return {
                    type: FETCH_PRODUCTS_BY_PAGE,
                    payload:  axios.get(`${ROOT_URL}?page=${page}`),
                }
            // } else {
            //     return {
            //         type: FETCH_PRODUCTS_BY_PAGE,
            //         payload:  axios.get(`${ROOT_URL}?category=${category}&page=${page}`),
            //     };
            // }
        } catch (error) {
            return {
                type: FETCH_PRODUCTS_FAIL,
                payload: error
            }
        }
    }
}


//when category selected, display the 1st set of 9 products that match
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
export async function filterByCategory(category) {
    try {
        const request = await axios.get(`${ROOT_URL}?page=1&category=${category}`);
        return {
            type: FILTER_BY_CATEGORY,
            payload: request,
        };
    } catch (error) {
        return {
            type: FAIL,
            payload: error
        }
    }
};



// when sort selected, re-order the store AND display the 1st set of 9