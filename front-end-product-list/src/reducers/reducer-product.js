import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    //reset the state everytime we run the didthecomponentmount
    case FETCH_PRODUCTS:
      // if(action.payload.data.id === )
      return state.concat([action.payload.data]);
    default:
      return state;
  }
}
