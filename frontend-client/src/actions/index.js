import axios from "axios";
export const PRODUCTS_FETCH = "PRODUCTS_FETCH";
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

const generateSearchUrlSnippet = (searchOptions) => {
  let searchUrlSnippet = '';
  if(searchOptions.page) {
    searchUrlSnippet += searchUrlSnippet ? `&page=${searchOptions.page}` : `?page=${searchOptions.page}`;
  }
  if(searchOptions.category) {
    searchUrlSnippet += searchUrlSnippet ? `&category=${searchOptions.category}` : `?category=${searchOptions.category}`;
  }
  return searchUrlSnippet
}

export const fetchProducts = (searchOptions) => {
  debugger;
  let url = `http://localhost:8000/products${generateSearchUrlSnippet(searchOptions)}`
  debugger;
  const request = axios.get(url);
  return {
    type: PRODUCTS_FETCH,
    payload: request
  }
}

export const setCurrentPage = (searchOptions) => {
  const newPage = searchOptions.page ? parseInt(searchOptions.page) : 1;
  debugger;
  return {
    type: SET_CURRENT_PAGE,
    payload: newPage
  }
}