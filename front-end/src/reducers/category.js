
// this is not working at this moment. 
import { GET_CATEGORIES } from '../actions/index';

 export default function(state = null, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload ? action.payload : state
    default:
      return state;
  }
}