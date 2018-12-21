import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = {}, action) {
  const { type, products, total, limit, page, pages } = action;
  switch (type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products,
        total,
        limit,
        page,
        pages
      };
    default:
      return state;
  }
}
