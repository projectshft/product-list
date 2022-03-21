import { SET_QUERY, SET_CATEGORY, SET_PRICE} from "../actions";

const DEFAULT_STATE = {
  query : "",
  category : "",
  price : "",

}

const FilterReducer = function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_QUERY:
      return {...state, query: action.payload}
    case SET_CATEGORY:
      return {...state, category: action.payload}
    case SET_PRICE:
      return {...state, price: action.payload}
    default:
      return state;
  }
}

export default FilterReducer; 