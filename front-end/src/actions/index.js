// import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FILTER_CATEGORY = "FILTER_CATEGORY";

//Synchronous action creator
const fetchProductsSuccess = products => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: { products }
})

//thunk action to request the first 9 of all 90 products from the db
export const fetchProducts = () => {
  return async (dispatch, getState) => {
  try {
    let response =  await axios.get('http://localhost:8000/products')
    const stateBefore = getState()
    console.log('StateBefore: ', stateBefore);
    dispatch(fetchProductsSuccess(response.data));
    // dispatch({type: FETCH_PRODUCTS, payload: response.data})
    const stateAfter = getState();
    console.log('StateAfter, ', stateAfter);
  }catch (error) {
    console.log(error);
  }
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