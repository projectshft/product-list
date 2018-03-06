import axios from "axios";

export const CHANGE_CURRENT_PAGE = "change_current_page";
export const SET_SEARCH_TERM = "search_term";
export const GET_CATEGORIES = "get_categories";
export const GET_PRODUCTS = "get_products";
export const SET_CATEGORY_FILTER = "set_category_filter";
export const SET_PRICE_SORT = "set_price_sort";

const ROOT_URL = 'http://localhost:8000';

export function changeCurrentPage(page) {
  return {
    type: CHANGE_CURRENT_PAGE,
    payload: page
  }
}

export function setSearchTerm(searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm
  }
}

export function setCategoryFilter(category) {
  return {
    type: SET_CATEGORY_FILTER,
    payload: category
  }
}

export function setPriceSort(priceSort){
  return {
    type: SET_PRICE_SORT,
    payload: priceSort
  }
}

export function getCategories(data, error) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/categories`,
    categories: data
  });
  
    return {
      type: GET_CATEGORIES,
      payload: request
    };
}

export function getProducts(params){
  //build url using request params
  let url = `${ROOT_URL}/products/`
  let queryString = '';
  for (let param in params) {
    if (params[param]) {
  //add appropriate url encoding 
      queryString += queryString.length 
      ? `&${param}=${params[param]}`
      : `?${param}=${params[param]}`;
    }
  };
  if (queryString) url += `${queryString}`;

  const request = axios({
    method: 'get',
    url: url,
  });
    return {
      type: GET_PRODUCTS,
      payload: request
    }
}