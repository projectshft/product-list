import { FETCH_PRODUCTS } from "../actions";

export default function(state = 1, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      if (action.payload) {
        return action.payload.data.page;
      }
      return state;
    default:
      return state;
  }
}
