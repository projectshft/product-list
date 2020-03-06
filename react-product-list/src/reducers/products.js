import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {
  console.log("action", action)
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log("action.payload", action.payload)
      return state
    default:
      return state;
  }
}