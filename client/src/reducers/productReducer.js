import { FETCH_PRODUCTS } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log('producs is ', action.payload);
      return [...state, action.payload]
    default:
      return state;
  }
}