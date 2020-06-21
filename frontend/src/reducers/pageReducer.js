import { STORE_PAGE } from "../actions/index";

export default function (state = 1, action) {
  switch (action.type) {
    case STORE_PAGE:
      return action.payload;
    default:
      return state;
  }
}
