import { FETCH_PRODUCTS } from '../actions/index';

export default function (state = [{ products: [], count: 0 }], action) {
  console.log('action', action.payload)
  switch (action.type) {
    case FETCH_PRODUCTS:
      return [{ products: action.payload.data.products, count: action.payload.data.count }]
    default:
      return state;
  }
}