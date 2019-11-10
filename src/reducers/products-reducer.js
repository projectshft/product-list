import { FETCH_PRODUCTS } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log("Products Response", action.payload);
      if (action.payload) {
        return action.payload.slice(0);
      }
      return state;
    default:
      return state;
  }
}
