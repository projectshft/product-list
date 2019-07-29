
import { FETCH_PRODUCTS } from '../actions';

export default function (state = {}, action) {
  if (action.error) {
    return (action.error);
  }
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data.pageCount;
    default:
      return state;
  }

}