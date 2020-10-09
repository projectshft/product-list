import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'; //a convention to add a line like this

const ROOT_URL = 'http://localhost:8000/products';
let request = '';

export function fetchProducts(search, category, sort, page) {
  if (search && !category && !sort && !page) {
    request = axios.get(`${ROOT_URL}?search=${search}`); //a promise
    console.log('FetchProducts Search', request);
    return {
      type: FETCH_PRODUCTS, //FETCH_PRODUCTS is action name"
      payload: request, //api call
    };

  } else if (!search && category && !sort && !page) {
    request = axios.get(`${ROOT_URL}?category=${category}`); //a promise
    console.log('FetchProducts Category', request);
    return {
      type: FETCH_PRODUCTS, //action name"
      payload: request, //api call
    };

  } else if (!search && !category && sort && !page) {
    request = axios.get(`${ROOT_URL}?sort=${sort}`); //a promise
    console.log('FetchProducts Sort ', request);
    return {
      type: FETCH_PRODUCTS, //action name"
      payload: request, //api call
    };

  } else if (!search && !category && !sort && page) {
    request = axios.get(`${ROOT_URL}?page=${page}`); //a promise
    console.log('FetchProducts Page ', request);
    return {
      type: FETCH_PRODUCTS, //action name"
      payload: request, //api call
    };
  }

  request = axios.get(`${ROOT_URL}`); //a promise
  console.log('FetchProducts Request', request);
  return {
    type: FETCH_PRODUCTS, //FETCH_PRODUCTS is action name"
    payload: request, //api call
  };
}
