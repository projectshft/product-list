import { FETCH_PRODUCTS, SET_CATEGORY, SET_PAGE, SET_QUERY, SET_SORT } from "../actions";

const DEFAULT_STATE = {
  currPage: 1,
  currQuery: '',
  currCategory: '',
  currSort: '',
  numProducts: 0,
  productList: [],
};

const productReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return Object.assign({}, state, action.payload.data);
    case SET_PAGE:
      return {...state, currPage: action.payload}
    case SET_QUERY:
        return {...state, currQuery: action.payload}
    case SET_CATEGORY:
      return {...state, currCategory: action.payload}
    case SET_SORT:
      return {...state, currSort: action.payload}
    default:
      return state;
  }
};

export default productReducer;