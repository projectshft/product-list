import _ from 'lodash'
import {
  FETCH_PRODUCTS,
  FILTER_CATEGORY,
  SORT_PRICE,
  PAGINATE_PRODUCTS
} from '../actions'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return _.mapKeys(action.payload.data, '_id')
    case FILTER_CATEGORY:
      return _.mapKeys(action.payload.data, '_id')
    case SORT_PRICE:
      return _.mapKeys(action.payload.data, '_id')
    case PAGINATE_PRODUCTS:
      return _.mapKeys(action.payload.data, '_id')
    default:
      return state
  }
}
