import { FILTER_CATEGORIES, SORT_PRICE } from '../actions/index';

export default function(state = {category: '', pageNumber: 1, price: ''}, action) {
  switch (action.type) {
    case FILTER_CATEGORIES:
      return {...state, category: action.payload}; 
    // case SORT_PRICE:
    //   return {...state, price: action.payload};
    default: 
      return state;
  } 
}
