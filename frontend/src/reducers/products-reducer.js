import {GET_PRODUCTS_SUCCESS } from "../constants"

const productsReducer = (state = [], action) => {
  switch(action.type) {
    case GET_PRODUCTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export default productsReducer