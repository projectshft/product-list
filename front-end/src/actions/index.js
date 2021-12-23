import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";

const ROOT_URL = "http://localhost:8000";  

export async function fetchProducts(page, category, query, sorting) {      
    const request = await axios.get(`${ROOT_URL}/products?page=${page}&category=${category}&query=${query}&price=${sorting}`);
       
    return {
        type: FETCH_PRODUCTS,
        payload: request        
    };
    
};

export function fetchCategories(searchedCategory) {
    const CATEGORY_URL = "http://localhost:8000/products?category=" + searchedCategory;
    const request = axios.get(`${CATEGORY_URL}`);

    return {
        type: FETCH_CATEGORIES,
        payload: request
    };
};

// Not needed for front end.
/*
export function fetchReviews(productId) {
    const REVIEW_URL = "localhost:8000/products/" + productId + "/reviews";
    const request = axios.get(`${REVIEW_URL}`);

    return {
        type: FETCH_REVIEWS,
        payload: request
    };
};
*/

