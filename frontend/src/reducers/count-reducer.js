import { SET_RESULT_COUNT } from "../constants"

const countReducer = (state = 0, action) => {
  switch(action.type) {
    case SET_RESULT_COUNT:
      return action.payload;
    default:
      return state;
  }
}

export default countReducer;