import { SEARCH_PRODUCTS } from "../actions/index";
import { FILTER_PRODUCTS } from "../actions/index";
import { withRouter } from "react-router";

export default function (state = [], action) {
  switch (action.type) {
    case FILTER_PRODUCTS:
      console.log("Action payload for FILTER_PRODUCTS is", action.payload);
      return action.payload.data;
    default:
      return state;
  }
}
