import { FETCH_PRODUCTS } from '../actions/index';

// getting data for productList container
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.products,
        total: action.total,
        limit: action.limit,
        categories: action.categories,
        page: action.page,
        pages: action.pages
      };
    default:
      return state;
  }
}
