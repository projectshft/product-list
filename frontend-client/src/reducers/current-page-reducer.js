import {SET_CURRENT_PAGE} from '../actions/index';

const currentPageReducer = (state = 1, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return action.payload;
    default:
      return state;
  }
}

export default currentPageReducer;