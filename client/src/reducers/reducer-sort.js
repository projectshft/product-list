import { GET_SORT } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case GET_SORT:
      return action.payload;
    default:

      return state;
  }
}