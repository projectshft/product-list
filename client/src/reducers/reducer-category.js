import { FETCH_CATEGORY } from '../actions/index';

export default function(state = [], action) {
  console.log(action.payload)
  switch (action.type) {
    case FETCH_CATEGORY:
      return action.payload.data;
    default:
      return state;
  }
}
