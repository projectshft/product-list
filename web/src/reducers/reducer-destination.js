// import _ from "lodash";
import { FETCH_DESTINATIONS } from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_DESTINATIONS:
      // console.log(action.payload.data)
      return action.payload.data;
    default:
      return state;
  }
}

//data sent to details.js
