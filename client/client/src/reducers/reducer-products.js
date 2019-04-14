// export default function(state = [], action) {
//   console.log('Action', action);
//   return state;
// }


import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return [action.payload.data];
    default: 
      return state;
  } 
}
