import { FETCH_PRODUCTS } from '../actions';

export default function (state = {list:[],count:0}, action) {
  console.log('in fetchProducts reducer');
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log('reducer FETCH_PRODUTS has', action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}

//TODO can the default be an Axios call?
