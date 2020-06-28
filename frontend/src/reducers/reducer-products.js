import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log("The reducer saw the case was fetch_products and returns...")
      console.log(action.payload.data)
      return action.payload.data; // data .product, data .count
    default:
      return state;
  }
}