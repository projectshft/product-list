import { SET_SORT_OPTION } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case SET_SORT_OPTION:
      return action.payload;
    default:
      return state;
  }
}