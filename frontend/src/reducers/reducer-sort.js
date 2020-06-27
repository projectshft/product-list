import { SET_SORT_OPTION } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case SET_SORT_OPTION:
      return action.payload; // data .product, data .count
    default:
      return state;
  }
}