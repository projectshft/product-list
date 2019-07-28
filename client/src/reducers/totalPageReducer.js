import _ from 'lodash';
import { FETCH_PRODUCTS, FETCH_BY_CATEGORY, FETCH_WITH_SORT} from '../actions';

export default function (state = {}, action){
  if (action.error){
    return (action.error);
  }
  switch (action.type){
    case FETCH_PRODUCTS:
      return action.payload.data.pageCount;
    case FETCH_BY_CATEGORY:
      return action.payload.data.pageCount;
    case FETCH_WITH_SORT:
      return action.payload.data.pageCount;
    default:
          return state;
      }
    
  }