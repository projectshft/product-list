import { FETCH_PRODUCTS, FETCH_PAGES } from "../actions/types";

const initialState = {
  products: [],
  pages: "",
  allProducts: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {...state, products: action.payload.products}
    case FETCH_PAGES:
      return {...state, pages: action.payload.pages}
    default:
      return state
  }
};

export default productReducer;