import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const SET_QUERY = 'SET_QUERY'
export const SET_PAGE = 'SET_PAGE'

const ROOT_URL = 'http://localhost:8000/products/';

export const fetchProducts = (query, page) => { 
  const queryUrl = query ? `query=${query}` : '';
  const pageUrl = page ? `page=${page}` : '';

  const url = `${ROOT_URL}?${queryUrl}&${pageUrl}`;

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