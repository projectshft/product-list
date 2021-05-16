import {CATEGORIES_FETCH} from '../actions/index'

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case CATEGORIES_FETCH:
      debugger;
      return action.payload.data
    default:
      return state;
  }
}

export default categoriesReducer;