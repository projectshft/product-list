import { FETCH_PRODUCTS } from '../actions';

export default function (state = {list:[],count:0}, action) {
  console.log('in fetchProducts reducer');

  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log('reducer FETCH_PRODUCTS has', action.payload);
      return action.payload;
    default:
      return state;
  }
}

//TODO can the default be an Axios call?
