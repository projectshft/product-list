import { FETCH_PRODUCTS } from '../Actions';
import _ from 'lodash';

export default function (state = {}, action) {
  if (action.error) return action.error;
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log(action.payload);
      console.log(action.payload.data);
      return {
        totalProducts: action.payload.data.count,
        pageNum: action.payload.data.pageNum,
        totalPages: action.payload.data.totalPages,
        products: {..._.mapKeys(action.payload.data.products, '_id')},
        categories: action.payload.data.categories,
        sortedByPrice: action.payload.data.sortedByPrice
      };
    default:
      return state;
  }
}