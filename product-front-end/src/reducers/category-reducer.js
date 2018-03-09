import { GET_CATEGORIES } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      state = action.payload.data
      return state
    default:
      return state
    }
}
