import _ from "lodash";

import { FETCH_PRODUCTS, PAGINATE_PRODUCTS, CATEGORY_FILTER, PRICE_SORT } from "../actions";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return _.mapKeys(action.payload.data, '_id')
    case PAGINATE_PRODUCTS:
      return _.mapKeys(action.payload.data, '_id')
    case CATEGORY_FILTER:
      return _.mapKeys(action.payload.data, '_id')
    case PRICE_SORT:
      return _.mapKeys(action.payload.data, '_id')
    default:
      return state;
  }
}