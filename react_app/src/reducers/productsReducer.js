import { FETCH_PRODUCTS, PRODUCTS_CATEGORY, PRODUCTS_PRICE, PRODUCTS_QUERY } from "../actions/types";

const initialState = {
  products: [],
  query: "",
  category: "",
  sort: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {...state, products: action.payload.products}
    case PRODUCTS_CATEGORY:
      return {...state, category: action.payload.category}
    case PRODUCTS_PRICE:
      return {...state, sort: action.payload.sort}
    case PRODUCTS_QUERY:
      return {...state, query: action.payload.query}
    default:
      return state
  }
};

export default productReducer;