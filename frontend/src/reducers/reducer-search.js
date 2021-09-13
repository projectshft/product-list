import { GET_PRODUCTS } from "../actions/actions";

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload.data[0];
    default:
      return state;
  }
};

export default searchReducer;
