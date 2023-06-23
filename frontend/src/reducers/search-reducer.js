import { FETCH_SEARCH } from "../actions";

const searchReducer = function (state = {}, action) {
  switch (action.type) {
    case FETCH_SEARCH:
      return {}
    default:
      return state;
  };
};

export default searchReducer;