import { FETCH_PRODUCTS } from '../actions/index';

export default function( state = {count: 0, products: []}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data; 
    default:
      return state;
  }
}