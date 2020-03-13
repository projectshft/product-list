import { FETCH_PRODUCTS } from "../actions";

const DEFAULT_STATE = {
  products: [],
  count: 0
}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log(action)
      return action.payload
    default:
      return state;
  }
}