import { SET_COUNT } from "../actions";

const initialState = {
  count: null
}


const countReducer =  (state = initialState , action) => {
  switch (action.type) {
    case SET_COUNT:  
    return  {
      ...state,
      count: action.payload
  }

    default:
      return state;
  };
}



export default countReducer;