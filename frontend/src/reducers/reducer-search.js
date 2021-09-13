import { GET_PRODUCTS } from "../actions/actions";

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      console.log(action.payload);
      return [action.payload];
    default:
      return state;
  }
};

export default searchReducer;
