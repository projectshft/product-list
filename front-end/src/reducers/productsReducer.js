/* eslint-disable no-plusplus */
import { FETCH_BY_QUERY, FETCH_PRODUCTS } from '../actions';

// eslint-disable-next-line default-param-last
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data;
    case FETCH_BY_QUERY:
      return action.payload.data;
    default:
      return state;
  }
};

export default productsReducer;
