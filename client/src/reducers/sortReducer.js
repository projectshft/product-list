import { UPDATE_SORT_ORDER} from '../actions';

export default function (state = {}, action){
  if (action.error){
    return (action.error);
  }
  switch (action.type){
  
    case UPDATE_SORT_ORDER:
        console.log(action.payload);
      return action.payload;
    default:
          return state;
      }
    
  }
