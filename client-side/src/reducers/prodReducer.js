import { FETCH_PRODUCTS, FETCH_FIRST } from "../actions/fetchProducts.js";

//attempting an empty ARRAY for default state outside of function so that it doesn't get redefined every time the function is called
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
