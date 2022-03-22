import { PAGE_OF_PRODUCTS_RECEIVED } from '../actions';

const defaultState = {
  products: [],
  page: 1,
  totalPages: 0
}

const productReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PAGE_OF_PRODUCTS_RECEIVED:
      return {
        products: action.payload.products,
        page: action.payload.page,
        totalPages: Math.floor(action.payload.totalFound / 9) + 1
      };
    default:
      return defaultState;
  }
};

export default productReducer;