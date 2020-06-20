import { SEARCH_PRODUCTS } from "../actions/index";
import { FILTER_CATEGORY } from "../actions/index";
import { SORT_PRODUCTS } from "../actions/index";

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      console.log(action.payload.data);
      return [action.payload.data];
    case FILTER_CATEGORY:
      return [action.payload.data];
    case SORT_PRODUCTS:
      return [action.payload.data];
    default:
      return state;
  }
}
