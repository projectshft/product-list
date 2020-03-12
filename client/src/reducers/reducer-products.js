import { FETCH_PRODUCTS } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log(action)
      return action.payload
    default:
      return state;
  }
}