import { SET_PAGE } from "../actions/index";

const countReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
      };
    default:
      return state;
    }
  }

export default countReducer;



