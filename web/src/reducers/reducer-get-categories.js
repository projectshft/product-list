import { GET_CATEGORIES } from '../actions';

const initialState = {_id: null, categories:[]};

export default function (state = initialState, action) {
  console.log('in fetchProducts reducer');

  switch (action.type) {
    case GET_CATEGORIES:
      console.log('reducer GET_CATEGORIES has', action.payload.data[0].categories);
      return Object.values(action.payload.data[0].categories);
    default:
      return state;
  }
}

