import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log('action.payload.data', action.payload.data)
      return state.concat([action.payload.data]);
    default:
      return state;
  }
}
