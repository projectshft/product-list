import _ from 'lodash'
import { FETCH_PRODUCTS } from "../actions"

const ProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      const productItems = _.mapKeys(action.payload.data.products, "_id")
      return ({productItems, productCount: action.payload.data.prodCount})
    default:
      return state;
  }
}

export default ProductsReducer