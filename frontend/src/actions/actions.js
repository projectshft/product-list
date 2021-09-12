import axios from "axios";
import { ROOT_URL, GET_PRODUCTS_SUCCESS,
  SET_SEARCH_QUERY, SET_CATEGORY_FILTER, SET_SORT_ORDER,
  SET_RESULT_COUNT } from "../constants";

export const getProducts = (queryParams) => {
  return (dispatch) => {
    axios
    .get(ROOT_URL + queryParams)
    .then(res => {
      dispatch(getProductsSuccess(res.data[0]));
      dispatch(setResultCount(res.data[1]));
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export const getProductsSuccess = (products) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: products
  }
}

export const setSearchQuery = (query) => {
  return {
    type: SET_SEARCH_QUERY,
    payload: query
  }
}

export const setCategoryFilter = (category) => {
  return {
    type: SET_CATEGORY_FILTER,
    payload: category
  }
}

export const setSortOrder = (order) => {
  return {
    type: SET_SORT_ORDER,
    payload: order
  }
}

export const setResultCount = (count) => {
  return {
    type: SET_RESULT_COUNT,
    payload: count
  }
}