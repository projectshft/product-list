import { PAGE_OF_PRODUCTS_RECEIVED } from '../actions';

const productReducer = (state = [], action) => {
  switch (action.type) {
    case PAGE_OF_PRODUCTS_RECEIVED:
      return action.payload;
    default:
      return [];
  }
};

export default productReducer;