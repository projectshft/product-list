import { UPDATE_PAGINATION } from "../actions";

  export default function(state = "1", action) {
  switch (action.type) {
    case UPDATE_PAGINATION:
      return action.payload ? action.payload : state
    default:
      return state;
  }
}
