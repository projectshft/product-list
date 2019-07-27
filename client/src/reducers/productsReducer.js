import _ from 'lodash';
import { FETCH_PRODUCTS, FETCH_BY_CATEGORY} from '../actions';

export default function (state = {}, action){
  console.log(FETCH_BY_CATEGORY);
  console.log(action);
  if (action.error){
    return (action.error);
  }
  switch (action.type){
    case FETCH_PRODUCTS:
      return _.mapKeys(action.payload.data, '_id');
    case FETCH_BY_CATEGORY:
      console.log('switch triggered!');
      return _.mapKeys(action.payload.data, '_id');
    default:
          return state;
      }
    
  }

