//localhost:8000/products
import { FETCH_PRODUCTS } from "../actions/index";

export default function(state = {count: 0, list: []}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data.products
    default:
      return state;
  }
}
