import { FETCH_PRODUCTS } from "../actions";

const DEFAULT_STATE = {
  numProducts: 0,
  productList: [],
};

const productReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      const currProducts = {productList: action.payload.data}
      return Object.assign({}, state, currProducts);
    default:
      return state;
  }
};

export default productReducer;