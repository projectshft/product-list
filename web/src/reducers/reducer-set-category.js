import { SET_CATEGORY } from '../actions';

const initialState = null;

export default function (state = initialState, action) {
  console.log('in setCategory reducer');

  switch (action.type) {
    case SET_CATEGORY:
      console.log('reducer SET_CATEGORY has', action.payload);
      return action.payload;
    default:
      return state;
  }
}

