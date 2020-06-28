import { SET_CATEGORY, FETCH_CATEGORIES } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload; // fetch all categories from database
    case SET_CATEGORY:
      return action.payload; // return selected category
    default:
      return state;
  }
}