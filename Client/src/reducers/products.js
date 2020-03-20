import { FETCH_PRODUCTS } from '../actions/index'

const INITIAL_STATE = {
  currentPage:1, currentSort:'', currentCategory:'', currentSearch:''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {...state, products: action.payload.data.products, count: action.payload.data.count}
    default:
      return state;
  }
}

