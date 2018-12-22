import {GET_PRODUCTS} from '../actions'

const productListReducer = (state = [], action) => {

  const {type} = action;
  switch (type) {
    case GET_PRODUCTS:
      console.log(action)
      //the request will be handled by the action middleware
      state = action.payload.products
      return state
    default:
      return state
  }
}
export default productListReducer