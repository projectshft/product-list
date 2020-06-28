import { SET_SEARCH_TERM } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.payload; // data .product, data .count
    default:
      return state;
  }
}