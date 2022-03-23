import { PAGE_NUMBER_RECIEVED } from "../actions";

const defaultState = {
  currentPage: 1
};

const pagesReducer = (state = defaultState, action) => {
  if (action.type === PAGE_NUMBER_RECIEVED) {
    return {...state, currentPage: action.payload}
  }
  return state;
};

export default pagesReducer;