import { FILTER_CATEGORIES } from '../actions/index';
import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = {products: [], count: 0}, action) { //state = {}
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data;//an array already? {product, count}
    // case FILTER_CATEGORIES:
    //   return [action.payload.data];
    default: 
      return state;
  } 
}
