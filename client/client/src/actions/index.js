import axios from 'axios';

const ROOT_URL = `http://localhost:8000/products`;

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FILTER_CATEGORIES = 'FILTER_CATEGORIES';
export const SORT_PRICE = 'SORT_PRICE';

// Only used for initial page load to return all products
export function fetchProducts(page, category = '', price = '') {

  const url = `${ROOT_URL}?page=${page}&category=${category}&price=${price}`;
  const request = axios.get(url);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

// Action to filter by a category, dispatched by {CategoryMenu} component
export function filterCategories(category) {

  return {
    type: FILTER_CATEGORIES,
    payload: category
  };
}

// Action to sort by price ascending or descending, dispatched by {PriceSort} component
export function sortPrice(price) {

  return {
    type: SORT_PRICE,
    payload: price
  };
}