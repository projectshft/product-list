import { SAVE_CATEGORY } from "../actions"

const QueryReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_CATEGORY:
      return {category: action.payload}
    default:
      return state;
  }
}

export default QueryReducer
