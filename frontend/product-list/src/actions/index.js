import axios from "axios";
import { useCallback } from "react";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_CATEGORY_LIST = "FETCH_CATEGORY_LIST";
export const SET_CATEGORY = "SET_CATEGORY";
export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const SET_SORT = "SET_SORT";
export const SET_PAGE = "SET_PAGE";
export const SELECT_PRODUCT = "SELECT_PRODUCT";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const ADD_PRODUCT = "ADD_PRODUCT"
const ROOT_URL = "http://localhost:8000";

export function fetchProducts(page, category, sort, query) {
  const request = axios.get(`${ROOT_URL}/products?page=${page}&category=${category}&price=${sort}&query=${query}`);
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/category-list`);
  
  return {
    type: FETCH_CATEGORY_LIST,
    payload: request
  };
}

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    payload: category
  };
}

export function searchProducts(query) {
  return {
    type: SEARCH_PRODUCTS,
    payload: query.query
  };
}

export function setSort(sortSelected) {
  return {
    type: SET_SORT,
    payload: sortSelected
  };
}

export function setPage(pageNum) {
  return {
    type: SET_PAGE,
    payload: pageNum
  };
}

export function selectProduct(productId) {
  const request = axios.get(`${ROOT_URL}/products/${productId}`);

  return {
    type: SELECT_PRODUCT,
    payload: request
  }
}

export function deleteReview(productId, reviewId) {
  const request = axios.delete(`${ROOT_URL}/products/${productId}/reviews/${reviewId}`);

  return {
    type: DELETE_REVIEW,
    payload: request
  }

}

export function addProduct(values, callback) {
  const request = axios.post(`${ROOT_URL}/products`, values);
  request.then(() => callback());

  return {
    type: ADD_PRODUCT,
    payload: request,
  };
}