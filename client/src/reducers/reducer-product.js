import { FETCH_PRODUCT } from "../actions"

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=[], action){
  switch(action.type){
    case FETCH_PRODUCT:
      console.log( 'console:',{...action.payload.data, ...state}); 
      return [action.payload.data.products, ...state]
    default: 
      return state
  }
}
