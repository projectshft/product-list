import { FETCH_PRODUCTS } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      if (action.payload) {
        return action.payload.data.products.slice(0);
      }
      return state;
    default:
      return state;
  }
}
