import { FETCH_PRODUCTS } from '../actions/index'

function productsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload.data,
      }
    default:
      return state;
  }
}

export default productsReducer;



