import { FETCH_COUNT } from "../actions";

export const productCountReducer = function (state = 0, action) {
  switch (action.type) {
    case FETCH_COUNT:
      return action.payload.data.count;
    default:
      return state;
  }
};
