import { UPDATE_SORT } from "../actions";

  export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_SORT:
      return action.payload ? action.payload : state
    default:
      return state;
  }
}
