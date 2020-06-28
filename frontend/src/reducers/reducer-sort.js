import { SET_SORT_OPTION } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case SET_SORT_OPTION:
      console.log("The reducer-sort was called. Here is the payload");
      console.log(action.payload);
      return action.payload; // data .product, data .count
    default:
      console.log("Here is state for sortReducer")
      console.log(state)
      return state;
  }
}