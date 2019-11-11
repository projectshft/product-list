import { FETCH_PRODUCTS } from "../actions"

const ProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return (action.payload.data)
    default:
      return state;
  }
}

export default ProductsReducer