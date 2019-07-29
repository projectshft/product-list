
import { FETCH_PRODUCTS } from '../actions';

export default function (state = { currentPage: 1 }, action) {
  if (action.error) {
    return (action.error);
  }
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data.currentPage;
    default:
      return state;
  }

}