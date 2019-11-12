import { FETCH_CATEGORIES } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      if (action.payload) {
        return action.payload.data.slice(0).sort();
      }
      return state;
    default:
      return state;
  }
}
