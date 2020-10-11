import axios from 'axios';
// import albumItems from '../data/album';
// action for calling products via API
export const FETCH_PRODUCTS = 'fetch_products';
export const SET_CURRENT_PAGE = 'set_current_page';
export const SET_SORT_ORDER = 'set_sort_order';
export const SET_SEARCH_TERM = 'set_search_term';
export const SET_CATEGORY = 'set_category';

const ROOT_URL = 'http://localhost:8000/products?';

export function fetchProducts(page, category, search, sort) {
  console.log('In actions index/ fetchProducts()')
  let queryBuild = '';
  if (search) {
    queryBuild = queryBuild + `q=${search}&`
  }
  if (page) {
    queryBuild = queryBuild + `page=${page}&`;
  }
  if (category) {
    queryBuild = queryBuild + `category=${category}&`
  }
  if (sort) {
    queryBuild = queryBuild + `price=${sort}`
  }

  const request = axios.get(
    `${ROOT_URL}${queryBuild}`
  );
  // ?=${search}&page=${page}&category=${category}
  // TODO tesy sorting
console.log('got', request);
console.log(` and page: ${page} and category: ${category} and search: ${search} and sort: ${sort}`);
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}


export function setCurrentPage(page) {
  return {
    type: SET_CURRENT_PAGE,
    payload: page  };
}

export function setSortOrder(order) {
  return {
    type: SET_SORT_ORDER,
    payload: order
  }
}

export function setSearchTerm(term) {
  return {
    type: SET_SEARCH_TERM,
    payload: term
  }
}

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    payload: category
  }
}

export function getCategories(page, category, search, sort) {
  console.log('In actions index.js getCategories()');

  const request = axios.get(
    `${ROOT_URL}/categories`
  );
  //returns obj with _id: null and categories: []
console.log('got', request.categories);
  return {
    type: GET_CATEGORIES,
    payload: request
  };
}

//sends to reducers
