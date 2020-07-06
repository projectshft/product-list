import { SORT_CATEGORY } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case SORT_CATEGORY:
      return action.payload;
    default:

      return state;
  }
}