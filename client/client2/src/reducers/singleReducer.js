import { GET_PRODUCT } from '../actions/getSingleProduct'

const singleProductReducer = (state = {}, action) => {

  const { type } = action;
  switch (type) {
    case GET_PRODUCT:
    console.log(state)
      state = action.payload
      return state
    default:
      return state
  }
}
export default singleProductReducer