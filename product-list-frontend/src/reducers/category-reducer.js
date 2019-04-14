import { UPDATE_CATEGORY } from "../actions";

  export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_CATEGORY:
      return action.payload ? action.payload : state
    default:
      return state;
  }
}
