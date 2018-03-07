import { UPDATE_PAGE_NUMBER, UPDATE_CATEGORY_FILTER, UPDATE_SORT_BY_PRICE, UPDATE_SEARCH_QUERY } from '../actions/'

const initialState = {
  page: 1
}

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAGE_NUMBER:
      return {
        ...state,
        page: action.payload
      }
    case UPDATE_CATEGORY_FILTER:
      return {
        ...state,
        category: action.payload
      }
    case UPDATE_SORT_BY_PRICE:
      return {
        ...state,
        price: action.payload
      }
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload
      }
    default:
      return state
  }
}
