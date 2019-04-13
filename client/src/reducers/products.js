import { FETCH_PRODUCTS } from '../actions/index';

// Reducer for the product list

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.products,
        total: action.total,
        limit: action.limit,
        page: action.page,
        pages: action.pages
      };
    default:
      return state;
  }
}