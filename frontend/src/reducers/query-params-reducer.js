import { SET_SEARCH_QUERY, SET_CATEGORY_FILTER, SET_SORT_ORDER, SET_PAGE_NUMBER, RESET_QUERY_PARAMS } from "../constants";

const queryParamsReducer = (state = {}, action) => {
  switch(action.type) {
    case SET_SEARCH_QUERY:
      state.query = action.payload;
      return state;
    case SET_CATEGORY_FILTER:
      state.category = action.payload;
      return state;
    case SET_SORT_ORDER:
      state.price = action.payload;
      return state;
    case SET_PAGE_NUMBER:
      state.page = action.payload;
      return state;
    case RESET_QUERY_PARAMS:
      return {};
    default:
      return state;
  }
}

export default queryParamsReducer;