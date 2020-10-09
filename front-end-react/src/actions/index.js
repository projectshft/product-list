import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'; //a convention to add a line like this
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const SEARCH_CATEGORIES = 'SEARCH_CATEGORIES';
export const SORT_PRODUCTS = 'SORT_PRODUCTS';

const ROOT_URL = 'http://localhost:8000/products';
let request = '';

export function fetchProducts(search, category, sort) {
  if (search && !category && !sort) {
    request = axios.get(`${ROOT_URL}?search=${search}`); //a promise
 
    console.log('FetchProducts Search', request);

    return {
      type: FETCH_PRODUCTS, //FETCH_PRODUCTS is action name"
      payload: request //api call
    };

  } else if (!search && category && !sort) {
    request = axios.get(`${ROOT_URL}?category=${category}`); //a promise

    console.log('FetchProducts Category', request);
    return {
      type: FETCH_PRODUCTS, //action name"
      payload: request //api call
    };

  } else if (!search && !category && sort) {
    request = axios.get(`${ROOT_URL}?sort=${sort}`); //a promise
    console.log('FetchProducts Sort ', request);

    return {
      type: FETCH_PRODUCTS, //action name"
      payload: request //api call
    };

  } else {
    request = axios.get(`${ROOT_URL}`); //a promise
    console.log('FetchProducts Request', request);

    return {
      type: FETCH_PRODUCTS, //FETCH_PRODUCTS is action name"
      payload: request //api call
    };

  }
}

