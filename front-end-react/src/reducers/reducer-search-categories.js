//localhost:8000/products
import { SEARCH_CATEGORIES } from "../actions/index";

export default function(state = {count: 0, list: []}, action) {
  switch (action.type) {
    case SEARCH_CATEGORIES:
      return action.payload.data.products
    default:
      return state;
  }
}
