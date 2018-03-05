import {GET_CATEGORIES} from "../actions";


export default function(state = [], action) {
  //populate category dropdown with categories from database
    switch (action.type) {
      case GET_CATEGORIES: {
        return action.payload.data;
      }
      default: {
        return state;
      }
    } 

  }
  
  
