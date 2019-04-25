import { FILTER_CATEGORIES } from '../actions/index';

export default function(state = {category: '', pageNumber: 1, sort: ''}, action) {
  switch (action.type) {
    case FILTER_CATEGORIES:
      return {...state, category: action.payload}; //case pageNum, sort
    default: 
      return state;
  } 
}
