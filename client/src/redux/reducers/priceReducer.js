import { SORT_PRICE } from "../actions/index";

function priceReducer(state = {}, action) {
  switch (action.type) {
    case SORT_PRICE:
      return {
        ...state,
        products: action.payload,
      }
    default:
      return state;
  }
}

export default priceReducer;

