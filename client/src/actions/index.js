//Other way
import axios from "axios";

export const QUERY_SORT = "QUERY_SORT";
export const PRICE_QUERY = "PRICE_QUERY";
export const CATEGORY_SORT = "CATEGORY_SORT";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const SET_ERROR = "SET_ERROR";
export const SET_COUNT = "SET_COUNT";


const ROOT_URL = "http://localhost:8000/products?";


const fetchProductsSuccess = (products) => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: { products },
});

export const fetchProducts = (category, price, query, page = 1) => {
let url = "";
return async(dispatch) => {
  url = `${ROOT_URL}page=${page}&category=${category}&price=${price}&query=${query}`;

  try {
    const request = await axios.get(url);
    dispatch(fetchProductsSuccess(request.data));
    
    dispatch(setCount(request.data.count))
  } catch (e) {
    console.log(e);
  }
};
}

export function setCount(count) {
  return {
    type: SET_COUNT,
    payload: count,
  };
  }


export function setError(errors) {
return {
  type: SET_ERROR,
  payload: errors,
};
}

export const setPrice = (price) => {
  return {
    type: PRICE_QUERY,
    payload: price,
  }
}

export const setCategory = (category) => {
  return {
    type: CATEGORY_SORT,
    payload: category,
  }
}

export const setQuery = (query) => {
  return {
    type: QUERY_SORT,
    payload: query,
  }
}