import { fetchProducts } from "../actions/index"
import _ from "lodash"

export default function (state = [], action) {
  switch (action.type) {
    case fetchProducts:
      console.log("action", action.payload.data);
      return action.payload.data;
    default:
      return state;
  }

}