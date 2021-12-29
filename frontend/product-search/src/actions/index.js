import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const SET_PAGE = 'SET_PAGE';
export const SET_QUERY = 'SET_QUERY';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_SORT = 'SET_SORT';

const ROOT_URL = 'http://localhost:8000/products/';

export const fetchProducts = (page, query, category, sort) => { 
  const urlPage = page ? `?page=${page}` : '';
  const urlQuery = query ? `&query=${query}` : '';
  const urlCategory = category ? `&category=${category}` : '';
  const urlSort = sort ? `&price=${sort}` : '';

  const url = `${ROOT_URL}${urlPage}${urlQuery}${urlCategory}${urlSort}`;

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

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page
  }
};

export const setQuery = (query) => {
  return {
    type: SET_QUERY,
    payload: query
  }
};

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    payload: category
  }
};

export const setSort = (sort) => {
  return {
    type: SET_SORT,
    payload: sort
  }
}