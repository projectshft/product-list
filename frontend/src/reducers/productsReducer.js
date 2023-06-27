import { FETCH_PRODUCTS } from "../actions/index";

const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: 
    return {
      products: action.payload.data.products,
      productCount: action.payload.data.totalNumberOfProducts,
      pageCount: action.payload.data.totalNumberOfPages,
      category: action.payload.data.products, // use map to get category key/value data instead of hardcoding
    }
    default:
      return state;
  };
};

export default productsReducer;