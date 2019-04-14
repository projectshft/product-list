import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_PAGE,
  FETCH_FILTERED_PRODUCTS,
  FETCH_BY_PRODUCT_NAME,
  FETCH_BY_PRICE
} from '../actions/index';

export default function (state = {}, action) {
  let data;
  switch (action.type) {
    case FETCH_PRODUCTS:
      data = action.payload.data
      return { ...state, data }

    case FETCH_FILTERED_PRODUCTS:
      data = action.payload.data;
      return { ...state, data }

    case FETCH_PRODUCTS_PAGE:
      data = action.payload.data
      return { ...state, data }

    case FETCH_BY_PRICE:
      data = action.payload.data
      return { ...state, data }

    case FETCH_BY_PRODUCT_NAME:
      data = action.payload.data
      return { ...state, data }
    default:
      return state;
  }
}