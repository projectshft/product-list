import { FETCH_PRODUCTS } from '../actions';

const initialState = {list:[],count:0};

export default function (state = initialState, action) {
  console.log('in fetchProducts reducer');

  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log('reducer FETCH_PRODUCTS has', action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}

//TODO can the default be an Axios call?
