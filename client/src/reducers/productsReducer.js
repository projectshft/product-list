import { ADD_PRODUCTS } from "../actions";

const DEFAULT_STATE = {};

const productsReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_PRODUCTS: return {...action.payload.data, ...state};
    default: return state;
  };
};

export default productsReducer;