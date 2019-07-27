import _ from 'lodash';
import { FETCH_PRODUCTS, FETCH_BY_CATEGORY, FETCH_WITH_SORT} from '../actions';

export default function (state = {}, action){
  if (action.error){
    return (action.error);
  }
  switch (action.type){
    case FETCH_PRODUCTS:
      return _.mapKeys(action.payload.data, '_id');
    case FETCH_BY_CATEGORY:
      return _.mapKeys(action.payload.data, '_id');
    case FETCH_WITH_SORT:
      return _.mapKeys(action.payload.data, '_id');
    default:
          return state;
      }
    
  }

