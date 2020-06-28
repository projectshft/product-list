import { FETCH_CATEGORIES } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      console.log("The reducer saw the case was fetch_categories and returns...")
      console.log(action.payload.data)
      return action.payload.data; // fetch all categories from database
    default:
      console.log("the state of reducer categories is")
      console.log(state)
      return state;
  }
}