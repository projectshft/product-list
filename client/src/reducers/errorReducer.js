import _ from 'lodash';
import { FETCH_PRODUCTS } from '../actions';

//reducer to set error status in store so a component can render accordingly in view
export default function (state = {}, action){
  switch (action.type){
    case FETCH_PRODUCTS:
      return {
        ...state,
        errorMessage: action.payload.message
      };
    default:
          return state;
      }
    
  }