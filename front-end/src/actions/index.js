import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';
export const SET_SEARCH_TERM = 'set_search_term';
export const SET_SORT_CHOICE = 'set_sort_choice';
export const SET_PAGE = 'set_page';
export const SET_CATEGORY = 'set_category'
// export const FETCH_PRODUCTS_BY_CATEGORY = 'fetch_products_by_category';

const ROOT_URL = 'http://localhost:8000/products';

// initial fetch posts, should load the first 9 products on page load
export function fetchProducts() {
    const request = axios.get(`${ROOT_URL}`)

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}
// not sure if this will be needed... commented out for now 
// fetch posts based on a category parameter
// export function fetchProductsByCategory(category) {
//     const request = axios.get(`${ROOT_URL}?category=${category}`);

//     return {
//         type: FETCH_PRODUCTS_BY_CATEGORY,
//         payload: request
//     };
// }

export function setSearchTerm(searchTerm){
    return {
        type: SET_SEARCH_TERM,
        payload: searchTerm
    }
}

export function setSortChoice(sortChoice){
    return {
        type: SET_SORT_CHOICE,
        payload: sortChoice
    }
}

export function setPage (page){
    return {
        type: SET_PAGE,
        payload: page
    }
}

export function setCategory(category){
    return {
        type: SET_CATEGORY,
        payload: category
    }
}