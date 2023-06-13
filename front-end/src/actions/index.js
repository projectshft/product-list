// import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FILTER_CATEGORY_SUCCESS = "FILTER_CATEGORY_SUCCESS";
export const SORT_BY_PRICE_SUCCESS = "SORT_BY_PRICE_SUCCESS";

//Synchronous action creators below
const fetchProductsSuccess = (products, productCount) => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: { products, productCount }
})

const filterCategorySuccess = (products, productCount) => ({
  type: 'FILTER_CATEGORY_SUCCESS',
  payload: { products, productCount }
})

const sortByPriceSuccess = (products, productCount) => ({
  type: 'SORT_BY_PRICE_SUCCESS',
  payload: { products, productCount }
})

//Thunk Actions Below

//thunk action to request the first 9 of all 90 products from the db
export const fetchProducts = () => {
  return async (dispatch, getState) => {
  try {
    let response =  await axios.get('http://localhost:8000/products')
    // const stateBefore = getState()
    // console.log('StateBefore: ', stateBefore);
    // console.log('response: ', response);
    dispatch(fetchProductsSuccess(response.data.products, response.data.productCount));
    // dispatch({type: FETCH_PRODUCTS, payload: response.data})
    // const stateAfter = getState();
    // console.log('StateAfter, ', stateAfter);
  }catch (error) {
    console.log(error);
  }
}
}

export const filterByCategory = (category, sort) => {
  return async (dispatch, getState) => {
    try {
      let response ;
      if(sort === undefined) {
         response = await axios.get('http://localhost:8000/products?category=' + category)
        console.log('response.data from action: ', response.data);
        dispatch(filterCategorySuccess(response.data.products, response.data.productCount));
      } else {
        response = await axios.get('http://localhost:8000/products?category=' + category + '&price=' + sort)
        console.log('response.data from action: ', response.data);
        dispatch(filterCategorySuccess(response.data.products, response.data.productCount));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const sortByPrice = (sort, category) => {
  return async (dispatch, getState) => {
    try {
      let response; 
      if(!category) {
        response = await axios.get('http://localhost:8000/products?price=' + sort)
        console.log(response.data.products);
        dispatch(sortByPriceSuccess(response.data.products, response.data.productCount));
      } else {
        response = await axios.get('http://localhost:8000/products?category=' + category + '&price=' + sort)
        dispatch(sortByPriceSuccess(response.data.products, response.data.productCount));
      }
    } catch (error) {
      console.log(error);
    }
  }
}