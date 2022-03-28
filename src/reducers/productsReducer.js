import { FETCH_PRODUCTS } from '../actions';

const productsReducer = (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCH_PRODUCTS:
      return payload.data;
    default:
      return state;
  }
};

export default productsReducer;
