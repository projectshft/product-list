import { GET_CATEGORY } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case GET_CATEGORY:
      return action.payload;
    default:

      return state;
  }
}