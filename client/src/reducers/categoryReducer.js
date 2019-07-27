import { UPDATE_STORE_CATEGORY} from '../actions';

export default function (state = {}, action){
  if (action.error){
    return (action.error);
  }
  switch (action.type){
    case UPDATE_STORE_CATEGORY:
      return action.payload;
    default:
          return state;
      }
    
  }
