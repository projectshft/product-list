import _ from "lodash";

import { FETCH_PRODUCTS } from "../actions";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return { ...state, [action.payload.data.id]: action.payload.data };
    default:
      return state;
  }
}