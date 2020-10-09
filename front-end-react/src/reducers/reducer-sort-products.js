import { SORT_PRODUCTS } from "../actions/index";

export default function(state = {count: 0, list: []}, action) {
  switch (action.type) {
    case SORT_PRODUCTS:
      return action.payload.data.products
    default:
      return state;
  }
}
