import { FETCH_PRODUCTS, SET_PAGE, SET_QUERY } from "../actions";

const DEFAULT_STATE = {
  currQuery: '',
  currPage: 1,
  currCategory: '',
  priceSort: '',
  numProducts: 0,
  productList: [],
};

const productReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return Object.assign({}, state, action.payload.data);
    case SET_QUERY:
      return Object.assign({}, state, action.payload);    
    case SET_PAGE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default productReducer;