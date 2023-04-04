import { FETCH_PRODUCTS, FETCH_PAGE } from "../actions/types";

const initialState = {
  products: [],
  page: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {...state, products: action.payload.products}
    case FETCH_PAGE: 
      return {...state, page: action.payload.page}
    default:
      return state
  }
};

export default productReducer;