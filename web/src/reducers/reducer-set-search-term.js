import { SET_SEARCH_TERM } from '../actions';

const initialState = null;

export default function (state = initialState, action) {
  console.log('in setSortOrder reducer');

  switch (action.type) {
    case SET_SEARCH_TERM:
      console.log('reducer SET_SEARCH_TIME has', action.payload);
      return action.payload;
    default:
      return state;
  }
}

