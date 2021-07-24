//import ACTION
import { FETCH_PRODUCTS } from "../actions/productsAction";

const initialState = {
  products: [],
  loaded: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loaded: true,
      };
    default:
      return state;
  }
};

export default productsReducer;
