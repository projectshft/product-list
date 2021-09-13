import { GET_PRODUCTS } from "../actions/actions";

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      console.log(action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
};

export default searchReducer;
