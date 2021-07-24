//import ACTION
import { FETCH_PRODUCTS } from "../actions/productsAction";
//import { SET_QUERY } from "../actions/productsAction";

const initialState = {
  query: [],
  products: [],
  loaded: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_QUERY:
    //   return {
    //     ...state,
    //     query: action.payload,
    //   };
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
