import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
        ///TODO
      return action.payload
    default:
      return state;
  }
}