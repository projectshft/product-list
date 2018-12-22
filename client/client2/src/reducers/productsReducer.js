import {GET_PRODUCTS} from '../actions'



const productListReducer = (state = [], action) => {

  const {type} = action;
  switch (type) {
    case GET_PRODUCTS:
      
      state = action.payload
      return state
    default:
      return state
  }
}
export default productListReducer