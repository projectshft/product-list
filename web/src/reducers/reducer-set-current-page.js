import { SET_CURRENT_PAGE } from '../actions';

const initialState = 1;

export default function (state = initialState, action) {
  console.log('in setCurrentPage reducer');

  switch (action.type) {
    case SET_CURRENT_PAGE:
      console.log('reducer SET_CURRENT_PAGE has', action.payload);
      return action.payload;
    default:
      return state;
  }
}

