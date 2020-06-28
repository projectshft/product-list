import { SET_PAGE } from '../actions/index';

export default function(state = 1, action) {
  switch (action.type) {
    case SET_PAGE:
      return action.payload; // return selected page
    default:
      return state;
  }
}