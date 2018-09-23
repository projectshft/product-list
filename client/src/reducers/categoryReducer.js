//this reducer handles the FETCH_PRODUCT action type
import { FETCH_CATEGORIES } from "../actions"
//do I need this?  see weather app example for info on how ids are handled
import _ from "lodash"

//pass in the initial or default state and an the action that is called
export default function (state = [], action) {
  // debugger;
  //action will move through all reducers to see if it matches the case (this reducer handles actions that are type=FETCH_PRODUCTS)
  switch (action.type) {
    //if the action type matches- return the payload
    case FETCH_CATEGORIES:
      console.log("ACTION PASSED TO THE CATEGORY REDUCER IS: ", action.payload);

      //???????????????????????????????????????????????????????
      return action.payload.data;
    //if the action type doesn't match return the default stateedit 
    default:
      return state;
  }
}
