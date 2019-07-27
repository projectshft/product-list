import { UPDATE_SORT_ORDER} from '../actions';

export default function (state = {}, action){
  if (action.error){
    return (action.error);
  }
  switch (action.type){
    case UPDATE_SORT_ORDER:
      return action.payload;
    default:
          return state;
      }
    
  }
