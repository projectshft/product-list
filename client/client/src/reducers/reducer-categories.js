import { FILTER_CATEGORIES } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FILTER_CATEGORIES:
      return [action.payload.data];
    default: 
      return state;
  } 
}
