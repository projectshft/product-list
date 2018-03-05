import { GET_PRODUCTS } from "../actions";

//set default products value for initial state. 
// totalProducts is the total number of products resulting from the user's search. used for setting the number of pages displayed in footer.
const defaultProducts = {
  products: [],
  totalProducts: '1'
}

export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
        return action.payload.data;
    }
    default: {
      return state;
    }
  }
}