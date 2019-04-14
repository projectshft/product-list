import axios from 'axios';
export const LOAD_PRODUCTS = 'load_products';
export const UPDATE_PAGINATION = 'update_pagination';
export const UPDATE_SORT = 'update_sort';
export const UPDATE_CATEGORY = 'update_category';

export function loadProducts(cat, sort, page) {
  const baseUrl = 'http://localhost:8000/products?page='+ page;
  const catQuery = cat ? "&category=" + cat : "";
  const sortQuery = sort ? "&price=" + sort : "";
  const url = baseUrl + catQuery + sortQuery;
  const products = axios.get(`${url}`);
  return {
    type: LOAD_PRODUCTS,
    payload: products,
  };
}

export function updatePagination(page) {
  return {
    type: UPDATE_PAGINATION,
    payload: page
  };
}

export function updateSort(sort) {
  return {
    type: UPDATE_SORT,
    payload: sort
  };
}

export function updateCategory(category) {
  return {
    type: UPDATE_CATEGORY,
    payload: category
  };
}