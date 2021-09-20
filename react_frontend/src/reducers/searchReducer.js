import { FETCH_PRODUCTS } from "../actions/fetch_products";

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data[1];
    default:
      return state;
  }
};

export default searchReducer