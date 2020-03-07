import { EDIT_CATEGORY } from '../actions/index';
import { EDIT_PAGE } from '../actions/index';
import { EDIT_PRICE } from '../actions/index';

export default function(state = {page:'page=1', category:'', price:''}, action) {
  switch (action.type) {
    case EDIT_PAGE:
        return Object.assign({}, state, {
            page: action.page
            })
    case EDIT_CATEGORY:
        return Object.assign({}, state, {
        category: action.category
        })
    case EDIT_PRICE:
        return Object.assign({}, state, {
            price: action.price
            })
    default:
        return state;
  }
}