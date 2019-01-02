//fetch initial list of ALL products for store AND display 1st 9
//when page # clicked, display that set of 9 products
//when category selected, display the 1st set of 9 products that match
//when sort selected, re-order the store AND display the 1st set of 9


import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

const ROOT_URL = "http://localhost:8000";


export function fetchProducts() {
    const request = axios.get(`${ROOT_URL}/products`);

    console.log('Request fetchProducts: ', request);

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}