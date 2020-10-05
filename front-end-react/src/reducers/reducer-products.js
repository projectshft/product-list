//localhost:8000/products
import { FETCH_PRODUCTS } from "../actions/index";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return [action.payload.data, ...state];
    default:
      return state;
  }
}
