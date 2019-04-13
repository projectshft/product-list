import { FETCH_PRODUCTS, FETCH_PRODUCTS_PAGE } from '../actions/index';

export default function (state = {}, action) {
  let data;
  switch (action.type) {
    case FETCH_PRODUCTS:
      data = action.payload.data
      return { ...state, data }

    case FETCH_PRODUCTS_PAGE:
      data = action.payload.data
      return { ...state, data }

    default:
      return state;
  }
}