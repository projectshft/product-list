import {CHANGE_PRICE_SORT, CHANGE_CATEGORY, SET_QUERY} from '../actions'


const reducer = function(state = {}, action) {
  switch (action.type) {
    case CHANGE_PRICE_SORT:
      return {...state, priceSort: action.payload};
    case CHANGE_CATEGORY:
      return {...state, category: action.payload}
    case SET_QUERY:
      return {...state, query: action.payload}
    default:
      return state;
  }
}

export default reducer;