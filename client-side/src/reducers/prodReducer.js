import { FETCH_PRODUCTS, FETCH_FIRST } from "../actions/fetchProducts.js";

const defaultState = [];
const FirstReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_FIRST:
      return action.payload.data.docs;
    default:
      return state;
  }
};
const ProductsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data.docs;
    default:
      return state;
  }
};
const reducers = {
  FirstReducer,
  ProductsReducer,
};

export default reducers;
