import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

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


    return {
        type: FETCH_PRODUCTS,
        payload: request
    }

}

