import {INITIAL_PRODUCTS_FETCH} from '../actions/index';
const defaultState = {
  products: [],
  count: 0
}
const productsReducer = (state = defaultState, action) => {
  debugger;
  switch (action.type) {
    case INITIAL_PRODUCTS_FETCH:
      let productResults = {
        products: action.payload.data.products,
        count: action.payload.data.count
      };
      return productResults;
    default:
      return state
  }
}

export default productsReducer;