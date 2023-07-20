import { FETCH_PRODUCT } from "../actions"

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=[], action){
  switch(action.type){
    case FETCH_PRODUCT:
       return [action.payload.data, ...state]
    default: 
      return state
  }
}
