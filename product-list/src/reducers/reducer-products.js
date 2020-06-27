import { FETCH_PRODUCTS } from '../actions/index';

//this is the ProductsReducer
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data.data[0];
    default:
      return state;
  }
}