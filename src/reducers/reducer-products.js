import _ from 'lodash'
import { FETCH_PRODUCTS } from "../actions"

const ProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return _.mapKeys(action.payload.data.products, "_id");
    default:
      return state;
  }
}

export default ProductsReducer