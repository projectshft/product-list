import { FETCH_PRODUCTS } from "../actions";

const searchReducer = function (state = {}, action) {

  switch (action.type) {
    
    case FETCH_PRODUCTS:
      return {
      
        products: action.payload.data
      }
    default:
      return state;
  };
};

export default searchReducer;