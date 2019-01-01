import { DISPLAY_CURRENT_PRODUCTS } from '../actions/types'


// const productReducers = combineReducers({
//   getAllProducts : function(state= null,action) {
//     switch(action.type) {
//       case "FETCH_PRODUCTS":
//         return action.payload
//     }
//   return state;
//   },
//   displayCurrentProducts : function(state=null,action) {
//     switch(action.type) {
//       case "DISPLAY_CURRENT_PRODUCTS":
//       return action.payload
//     }
//   return state;
//   }
// })

// export default productReducers;

export default function(state=[], action) {
  switch(action.type) {
    case DISPLAY_CURRENT_PRODUCTS:
      return action.payload
    }
  return state;
}