import { SET_CATEGORIES } from '../actions'

const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;