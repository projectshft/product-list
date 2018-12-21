import {GET_PRODUCTS} from '../actions'

const productListReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
    //the request will be handled by the action middleware
      return state.push(action.payload.data)
    default:
      return state
  }
}
export default productListReducer