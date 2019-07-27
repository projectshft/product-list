import { FETCH_PRODUCTS } from '../Actions';
import _ from 'lodash';

export default function (state = {}, action) {
  if (action.error) return action.error;
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log(action.payload);
      console.log(action.payload.data);
      return _.mapKeys(action.payload.data.products, '_id');
    default:
      return state;
  }
}