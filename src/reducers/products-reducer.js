import { FETCH_PRODUCTS } from '../actions';

// eslint-disable-next-line default-param-last
const productReducer = function (state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data;
    default:
      return state;
  }
};

export default productReducer;
