import { GET_PAGE } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case GET_PAGE:
      return action.payload;
    default:

      return state;
  }
}