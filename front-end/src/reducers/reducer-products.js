import _ from 'lodash';
import { FETCH_PRODUCTS } from '../actions';

const DEFAULT_STATE = {
  product: []
}

const productsReducer = function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case FETCH_PRODUCTS:

    return {
      products: [action.payload.data]
    }

    default:
      return state;
  }
}

export default productsReducer;