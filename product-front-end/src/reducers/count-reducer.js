import { GET_COUNT } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case GET_COUNT:
      const count = action.payload.data
      return count
  }

    return state
}
