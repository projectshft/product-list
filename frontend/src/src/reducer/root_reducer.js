import { FETCH_PRODUCTS, FETCH_PRODUCT } from '../action';

const defaultState = [];

const ProductReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.payload.data.products;
    default:
      return state;
  }
};

const ProductsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data;
    default:
      return state;
  }
};

const reducers = {
  ProductReducer,
  ProductsReducer,
};

export default reducers;
