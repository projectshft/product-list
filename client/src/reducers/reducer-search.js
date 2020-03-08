import { CATEGORY_SEARCH } from '../actions';
import { PRICE_SEARCH } from '../actions';
import { PRODUCT_SEARCH } from '../actions';

export default function(state = { category:'', price:'', name: '' }, action) {
  switch (action.type) {
    case CATEGORY_SEARCH:
        return Object.assign({}, state, { category: action.category })
    case PRICE_SEARCH:
        return Object.assign({}, state, { price: action.price })
    case PRODUCT_SEARCH:
        return Object.assign({}, state, { name: action.name})
    default:
        return state;
  }
}