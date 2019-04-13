import { FETCH_PRODUCTS } from '../actions/index';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      const data = action.payload.data
      console.log('producs is ', data);
      return { ...state, data }
    default:
      return state;
  }
}