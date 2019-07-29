import _ from 'lodash';
import { FETCH_PRODUCTS } from '../actions';

export default function (state = {}, action) {
  if (action.error) {
    return (action.error);
  }
  switch (action.type) {
    case FETCH_PRODUCTS:
      return _.mapKeys(action.payload.data.products, '_id');
    default:
      return state;
  }

}

