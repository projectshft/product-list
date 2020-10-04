import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';
export const FETCH_PRODUCTS_BY_CATEGORY = 'fetch_products_by_category';

const ROOT_URL = 'http://localhost:8000/products';

// initial fetch posts, should load the first 9 products on page load
export function fetchProducts() {
    const request = axios.get(`${ROOT_URL}`)
    // .then(response => console.log(response));

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}
// fetch posts based on a category parameter
export function fetchProductsByCategory(category) {
    const request = axios.get(`${ROOT_URL}?category=${category}`);

    return {
        type: FETCH_PRODUCTS_BY_CATEGORY,
        payload: request
    };
}