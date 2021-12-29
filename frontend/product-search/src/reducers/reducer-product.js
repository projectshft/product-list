import { FETCH_PRODUCTS, SET_CATEGORY, SET_PAGE, SET_QUERY, SET_SORT } from "../actions";

const DEFAULT_STATE = {
  currQuery: '',
  currPage: 1,
  currCategory: '',
  currSort: '',
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
    case SET_CATEGORY:
      return Object.assign({}, state, action.payload);
    case SET_SORT:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default productReducer;