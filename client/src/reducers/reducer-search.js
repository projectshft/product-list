import { CATEGORY_SEARCH } from '../actions/index';
import { PRICE_SEARCH } from '../actions/index';
import { PRODUCT_SEARCH } from '../actions/index';
import { SET_PAGE } from '../actions/index';

export default function(state = { page: 1, category:'', price:'', name: '' }, action) {
  switch (action.type) {
    case CATEGORY_SEARCH:
        return Object.assign({}, state, { page: 1, category: action.category })
    case PRICE_SEARCH:
        return Object.assign({}, state, { page: 1, price: action.price })
    case PRODUCT_SEARCH:
        return Object.assign({}, state, { page: 1, name: action.name})
    case SET_PAGE:
        return Object.assign({}, state, { page: action.page})
    default:
        return state;
  }
}