import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const SET_QUERY = 'SET_QUERY'
export const SET_PAGE = 'SET_PAGE'
export const SET_CATEGORY = 'SET_CATEGORY'

const ROOT_URL = 'http://localhost:8000/products/';

export const fetchProducts = (query, page, category) => { 
  const queryUrl = query ? `query=${query}` : '';
  const pageUrl = page ? `page=${page}` : '';
  const categoryUrl = category ? `category=${category}` : '';

  const url = `${ROOT_URL}?${pageUrl}&${queryUrl}&${categoryUrl}`;

  return axios
    .get(url)
    .then(request => {
      return {
        type: FETCH_PRODUCTS,
        payload: request
      };
    })    
    .catch((err) => {
      alert(`Please try again:\n${err}`);
      return {
        type: null,
        payload: null,
      };
    });
};

export const setQuery = (query) => {
  return {
    type: SET_QUERY,
    payload: {currQuery: query}
  }
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: {currPage: page}
  }
};

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    payload: {currCategory: category}
  }
};