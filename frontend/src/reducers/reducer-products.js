import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
    console.log('Action', action);
      return [action.payload.data, ...state];
    default:
      return state;
  }
}