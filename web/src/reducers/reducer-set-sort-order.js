import { SET_SORT_ORDER } from '../actions';

const initialState = 'None';

export default function (state = initialState, action) {
  console.log('in setSortOrder reducer');

  switch (action.type) {
    case SET_SORT_ORDER:
      console.log('reducer SET_SORT_ORDER has', action.payload);
      return action.payload;
    default:
      return state;
  }
}

