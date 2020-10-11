import { GET_CATEGORIES } from '../actions';

const initialState = {categories:[]};

export default function (state = initialState, action) {
  console.log('in fetchProducts reducer');

  switch (action.type) {
    case GET_CATEGORIES:
      console.log('reducer GET_CATEGORIES has', action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}

//TODO can the default be an Axios call?
