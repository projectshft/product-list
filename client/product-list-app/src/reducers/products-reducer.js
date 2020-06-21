import { SEARCH_PRODUCTS } from "../actions/index";

export default function (state = {
  count: 0,
  productResults: []
}, action) {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      return action.payload.data;
    default:
      return state;
  }
}
