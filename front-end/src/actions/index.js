// import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FILTER_CATEGORY = "FILTER_CATEGORY";


//thunk action to request the first 9 of all 90 products from the db
export async function fetchProducts(dispatch, getState) {
  try {
    const response =  await axios.get('http://localhost:8000/products')
    console.log('response: ', response);
    dispatch({type: FETCH_PRODUCTS, payload: response.data})
  }catch (error) {
    console.log(error);
  }
}

export async function filterByCategory (category) {
  const request = await axios.get('http://localhost:5000/products?page=1&category=' + category)

  console.log(request);

  return {
    type: FILTER_CATEGORY,
    payload: request
  }
}