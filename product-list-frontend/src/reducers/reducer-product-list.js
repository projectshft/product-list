import { FETCH_PRODUCTS, FETCH_PRODUCTS_COUNT, FETCH_PRODUCTS_CATEGORIES } from '../actions'

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        productList: action.payload.data
      }
    case FETCH_PRODUCTS_COUNT:
      return {
        ...state,
        productCount: action.payload.data
      }
    case FETCH_PRODUCTS_CATEGORIES:
      return {
        ...state,
        productCategories: action.payload.data
      }
    default:
      return state
  }
}
