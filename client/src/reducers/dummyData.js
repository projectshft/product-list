import { DUMMY } from '../actions';

const dummyDataReducer = function(state = [], action) {
  switch(action.type) {
    case DUMMY: 
      return action.payload.data;
    default: 
      return state;  
  }
}