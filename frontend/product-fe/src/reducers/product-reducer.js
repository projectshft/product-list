import { FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from "../actions";

const DEFAULT_STATE = {
  products: []
}

const productReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        products: action.payload.products
      }
    default:
      return state;
  }
}

export default productReducer;