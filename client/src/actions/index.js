import axios from 'axios';

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FIND_PRODUCTS = "FIND_PRODUCTS";
export const GET_CATEGORY = "GET_CATEGORY";
export const GET_PAGE = "GET_PAGE";
export const GET_SORT = "GET_SORT";


const ROOT_URL = `http://localhost:3001`;

//Get products
export function fetchProducts() {
    const request = axios.get(ROOT_URL + "/products");

    console.log('ACTION - FETCH RESULT:', request)

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}

//Get products by id
export function fetchProducts(id) {
    const request = axios.get(ROOT_URL + "/products/" + id);

    console.log('ACTION - FETCH BY ID RESULT:', request)
  
    return {
      type: FETCH_PRODUCTS,
      payload: request
    };
  }

  //Get product from search
export function findProducts(query) {
    const request = axios.get(ROOT_URL + "search?query=" + query) 
        .catch((error) => {
            if (error.response) {
                alert(error)
            }
        })

        console.log('ACTION - SEARCH RESULT:', request)

    return {
        type: FIND_PRODUCTS,
        payload: request
    }
}

//Get category
export function getCategory(category) {
    return {
      type: GET_CATEGORY,
      payload: category
    }
  }

  //Get the current page
export function getPage(page) {
  return {
    type: GET_PAGE,
    payload: page
  }
}

//Get sort method
export function getSort(sort) {
  return {
    type: GET_SORT,
    payload: sort
  }
}
  