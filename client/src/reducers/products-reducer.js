import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_PRODUCTS:
      const data = action.payload.data;
      console.log(action.payload.data)
      return {...data}
    default:
      return state;
  }
}