import _ from "lodash";
import { FETCH_PRODUCTS, FIND_PRODUCTS } from "../actions";
// import { FETCH_POSTS, FETCH_POST } from "../actions";


export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FIND_PRODUCTS:
      return { ...state, [action.payload.data.id]: action.payload.data };
    default:
      return state;
  }
}
