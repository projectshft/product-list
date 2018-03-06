import { CHANGE_CURRENT_PAGE } from "../actions";
// import {FETCH_CAPTION} from "../actions";
// import {INITIAL_SEARCH} from "../actions";
// import {RESET_GAME} from "../actions";

export default function(state = '1', action) {
  //change current page based on user's page selection.
  switch (action.type) {
    case CHANGE_CURRENT_PAGE: {
      return action.payload;
    }
    default:
      return state;
  }
}
  