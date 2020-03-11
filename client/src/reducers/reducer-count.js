import { FETCH_COUNTS } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_COUNTS:
      console.log(action)
      return action.payload.count
    default:
      return state;
  }
}