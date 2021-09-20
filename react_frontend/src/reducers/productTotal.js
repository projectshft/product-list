import { FETCH_PRODUCTS } from "../actions/fetch_products";

const countReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data[0];
    default:
      return state;
  }
};

export default countReducer