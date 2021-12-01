import { FETCH_PRODUCT_COUNT } from "../actions/actions.js";

const countReducer = function(state = 0, action) {
  switch (action.type) {
    case FETCH_PRODUCT_COUNT:

      if (!action.payload.data) {
        return state;
      };
      state = parseInt(action.payload.data[1].count);
      console.log(action.payload.data);
      return state;

    default:
      return state;
  }
};

export default countReducer;