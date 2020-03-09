import { FETCH_PRODUCTS } from '../actions/index'
import { FETCH_PRODUCTS_BY_CATEGORY } from '../actions/index';
import { FETCH_PRODUCTS_BY_NAME } from '../actions/index';
import { FETCH_PRODUCTS_BY_PRICE } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data;
    case FETCH_PRODUCTS_BY_CATEGORY:
      return action.payload.data;
    case FETCH_PRODUCTS_BY_NAME:
      return action.payload.data;
    case FETCH_PRODUCTS_BY_PRICE:
      return action.payload.data;    
    default:
      return state;
  }
}