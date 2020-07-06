import { FIND_PRODUCTS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FIND_PRODUCTS:
      return action.payload;
    default:

      return state;
  }
}