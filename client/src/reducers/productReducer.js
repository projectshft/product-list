//this reducer handles the FETCH_PRODUCT action type
import { FETCH_PRODUCTS } from "../actions"
//do I need this?  see weather app example for info on how ids are handled
import _ from "lodash" 

//pass in the initial or default state and an the action that is called
export default function (state=[], action) {

  //action will move through all reducers to see if it matches the case (this reducer handles actions that are type=FETCH_PRODUCTS)
  switch (action.type) {
    //if the action type matches- return the payload
    case FETCH_PRODUCTS:
      console.log("ACTION PASSED TO THE PRODUCT REDUCER IS: ", action.payload.products);

      return action.payload.products;
    //if the action type doesn't match return the default state
    default:
      return state;
  }
}
