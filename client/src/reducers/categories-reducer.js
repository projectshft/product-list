import { FETCH_PRODUCT_CATEGORIES } from "../actions/actions.js";

const categoriesReducer = function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCT_CATEGORIES:
      
      if (!action.payload.data) {
        return state;
      };

      state = action.payload.data;
      return state;

    default:
      return state;
  }
};

export default categoriesReducer;