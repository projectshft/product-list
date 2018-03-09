import { FETCH_PRODUCTS } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
        state = []
        const data = action.payload.data.map((product) => {
          return {
            category: product.category,
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            reviews: product.reviews
          }
        })
        let newState = state.concat(data);
        return newState
    default:
      return state
  }
}
