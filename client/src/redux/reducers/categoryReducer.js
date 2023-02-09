import { UPDATE_CATEGORY } from "../actions/index";

const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY:
      return {
        ...state,
        // products: action.payload,
      };
    default:
      return state;
    }
  }

export default categoryReducer;



