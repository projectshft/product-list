import { SET_CATEGORY, SET_SORT, SET_PAGE } from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case SET_CATEGORY:
      const category = action.payload.data
      state.category = price
      return state
    case SET_SORT:
      const price = action.payload.data
      state.price = price
      return state
    case SET_PAGE:
      const page = action.payload.data
      state.page = page
      return state
  }
    return state
}
