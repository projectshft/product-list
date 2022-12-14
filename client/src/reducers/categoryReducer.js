import {SET_CATEGORIES} from '../actions'

const reducer = (state = [], action) => {
  switch (action) {
    case SET_CATEGORIES:
      debugger;
      return action.payload;
    default:
      return state;
  }
}

export default reducer;