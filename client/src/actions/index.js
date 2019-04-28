import axios from 'axios';

const rootURL = 'http://localhost:8000/products';

/*******************
 * GET CATEGORIES
 * *****************/
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const getCategories = () => {
  let url = rootURL + '/products/categories';
  const request = axios.get(url, {
    headers: { 'Content-Type': 'application/json' }
  });
  return {
    type: GET_CATEGORIES,
    payload: request
  };
};

/**********************************************************
 * A function to build the url with product query/filter
 * ********************************************************/
const filter = query => {
  let queryParams = [];
  for (var key in query)
    if (query.hasOwnProperty(key)) queryParams.push(key + '=' + query[key]);
  if (queryParams.length > 0) return '?' + queryParams.join('&');
  else return '';
};

/*******************
 * GET PRODUCTS
 * *****************/
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const getProducts = (query = {}) => {
  let filteredURL = filter(query);
  let url = rootURL + '/products' + filteredURL;
  const request = axios.get(url, {
    headers: { 'Content-Type': 'application/json' }
  });

  return {
    type: GET_PRODUCTS,
    payload: request
  };
};
