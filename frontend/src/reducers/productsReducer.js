import { FILTER_PRODUCTS } from "../actions/index";

export default function (state = [], action) {
  switch (action.type) {
    case FILTER_PRODUCTS:
      return [action.payload.data];
    default:
      return state;
  }
}
