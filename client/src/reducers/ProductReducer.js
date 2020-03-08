import { SEARCH_PRODUCTS } from "../actions";

export default function (state = [], action) {

  switch (action.type) {
    case SEARCH_PRODUCTS:
      console.log(action.payload.data);
      return action.payload.data;

    default:
      return state;

  }
}