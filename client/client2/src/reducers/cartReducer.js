import {GET_CART} from '../actions/getCart'
import {ADD_CART} from '../actions/addCart'
import {DELETE_CART} from '../actions/deleteCart'



const cartReducer = (state = [] , action) => {
  const {type} = action
  switch (type) {
    case DELETE_CART:
      state = action.payload
      return state
    case ADD_CART:
      state = action.payload
      return state
    case GET_CART:
    console.log(action.payload,"reducer")
    if(!action.payload.error){
    state = action.payload
     }
    return state
    default:
      return state
  }
}
export default cartReducer