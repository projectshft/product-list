import { FETCH_PRODUCTS } from "../actions"
import _ from "lodash"

export default function (state=[], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log("action", action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}
