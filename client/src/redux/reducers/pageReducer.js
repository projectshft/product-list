import { SET_PAGE } from "../actions/index";

const pageReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
      };
    default:
      return state;
    }
  }

export default pageReducer;



