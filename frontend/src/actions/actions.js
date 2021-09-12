import axios from "axios";
import { ROOT_URL, GET_PRODUCTS_SUCCESS } from "../constants";

export const getIntialProducts = () => {
  return (dispatch) => {
    axios
    .get(ROOT_URL)
    .then(res => {
      dispatch(getProductsSuccess(res));
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