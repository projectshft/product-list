import { SET_CATEGORY, SET_SORT, SET_PAGE } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case SET_CATEGORY:
      state.category = action.payload
      return state
    case SET_SORT:
      state.price = action.payload
      return state
    case SET_PAGE:
      state.page = action.payload
      return state
    default:
      return state
  }
}
