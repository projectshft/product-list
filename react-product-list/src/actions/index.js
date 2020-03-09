import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/products?'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const EDIT_PAGE = 'EDIT_PAGE';
export const EDIT_PRICE = 'EDIT_PRICE';
export const EDIT_SEARCH = 'EDIT_SEARCH';

export function fetchProducts(query) {
  //sets url and breaks down the query state
  const url = `${ROOT_URL}` + query.page + query.category + query.price + query.search

  //makes request to the server
  const request = axios.get(url)
    .catch(function (error) {
      if (error) {
        console.log(error)
      }
    });
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

//edits the category state
export function editCategory(category) {
  console.log('category searched', category)
  return {
    type: EDIT_CATEGORY,
    category: category
  };
}

//edits the price state
export function editPrice(sort) {
  console.log('Price searched', sort)
  return {
    type: EDIT_PRICE,
    price: sort
  };
}

//edits the page state
export function editPage(page) {
  console.log('Page searched', page)
  return {
    type: EDIT_PAGE,
    page: page
  };
}

//edits the page state
export function editSearch(term) {
  console.log('searched', term)
  return {
    type: EDIT_SEARCH,
    search: term
  };
}
