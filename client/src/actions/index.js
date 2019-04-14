import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_PRICE_SORT = 'SET_PRICE_SORT';
export const SET_PAGE = 'SET_PAGE';

const ROOT_URL = 'http://localhost:8000/products';

export const getProducts = (category, price, page) => {
  const params = {};
  let URL = ROOT_URL;
  // Change the URL depending on options passed in
  let queryString = '';

  if (category || price || page) {
    queryString = '?';
    params.category = category;

    if (params.category === 'All') {
      delete params.category;
    }
  }

  if (price) {
    params.price = price;
  }

  if (page) {
    params.page = page;
  }

  for (let param in params) {
    queryString += `${param}=${params[param]}&`;
  }

  const request = axios.get(URL + queryString.slice(0, -1));

  return {
    type: GET_PRODUCTS,
    payload: request
  };
};

export const getCategories = () => {
  const URL = `${ROOT_URL}/categories/all`;

  const request = axios.get(URL);

  return {
    type: GET_CATEGORIES,
    payload: request
  };
};

export const setCurrentCategory = category => {
  return {
    type: SET_CATEGORY,
    payload: category
  };
};

export const setCurrentPriceSort = sort => {
  return {
    type: SET_PRICE_SORT,
    payload: sort
  };
};

export const setCurrentPage = page => {
  return {
    type: SET_PAGE,
    payload: page
  };
};
