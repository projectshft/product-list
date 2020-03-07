import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log('action.payload.data.products', action.payload.data.products)
      return [{products: action.payload.data.products, count:action.payload.data.count}]
    default:
      return state;
  }
}