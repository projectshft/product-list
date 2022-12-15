import { SET_PRODUCTS } from '../actions';

function reducer (state = {}, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.payload.data;
    default:
      return state;
  }
}

export default reducer;
