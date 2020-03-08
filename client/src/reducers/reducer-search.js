import { PRICE_SEARCH } from "../actions";

export default function(state = {price:''}, action) {
  switch (action.type) {
    case PRICE_SEARCH:
      return Object.assign({}, state, {price: action.price});
    default:
      return state;
  }
}