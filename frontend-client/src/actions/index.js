import axios from "axios";
export const PRODUCTS_FETCH = "PRODUCTS_FETCH";
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const CATEGORIES_FETCH = 'CATEGORIES_FETCH';

const generateSearchUrlSnippet = (searchOptions) => {
  let searchUrlSnippet = '';
  if(searchOptions.page) {
    searchUrlSnippet += searchUrlSnippet ? `&page=${searchOptions.page}` : `?page=${searchOptions.page}`;
  }
  if(searchOptions.category) {
    searchUrlSnippet += searchUrlSnippet ? `&category=${searchOptions.category}` : `?category=${searchOptions.category}`;
  }
  if(searchOptions.price) {
    searchUrlSnippet += searchUrlSnippet ? `&price=${searchOptions.price}` : `?price=${searchOptions.price}`;
  }
  if(searchOptions.query) {
    searchUrlSnippet += searchUrlSnippet ? `&query=${searchOptions.query}` : `?query=${searchOptions.query}`;
  }
  return searchUrlSnippet
}

export const fetchProducts = (searchOptions) => {
  let url = `http://localhost:8000/products${generateSearchUrlSnippet(searchOptions)}`
  const request = axios.get(url);
  return {
    type: PRODUCTS_FETCH,
    payload: request
  }
}

export const setCurrentPage = (searchOptions) => {
  const newPage = searchOptions.page ? parseInt(searchOptions.page) : 1;
  return {
    type: SET_CURRENT_PAGE,
    payload: newPage
  }
}

export const fetchCategories = () => {
  const request = axios.get('http://localhost:8000/categories')
  return {
    type: CATEGORIES_FETCH,
    payload: request
  }
}