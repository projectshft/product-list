import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/products'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const EDIT_PAGE = 'EDIT_PAGE';
export const EDIT_PRICE = 'EDIT_PRICE';

export function fetchProducts(query) {
    console.log('query', query)
  const url = `${ROOT_URL}`
  const request = axios.get(url)
    .catch(function (error) {
      if (error.response) {
        console.log(error)
      }
    });
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}


export function editCategory(category) {
    console.log('category searched', category)
  return {
    type: EDIT_CATEGORY,
    category: category
  };
}


export function editPrice(sort) {
    console.log('Price searched', sort)
  return {
    type: EDIT_PRICE,
    price: sort
  };
}

export function editPage(page) {
    console.log('Page searched', page)
  return {
    type: EDIT_PAGE,
    page: page
  };
}