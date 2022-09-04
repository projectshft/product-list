import { ADD_PRODUCTS } from "../actions";

const DEFAULT_STATE = {};

const productsReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_PRODUCTS: return {...state, ...action.payload.data};
    default: return state;
  };
};

export default productsReducer;