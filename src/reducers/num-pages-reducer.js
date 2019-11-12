import { FETCH_PRODUCTS } from "../actions";

export default function(state = 0, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      if (action.payload) {
        let { productCount, perPage } = action.payload.data;

        let pages = productCount / perPage;
        if (productCount % perPage > 0) {
          pages++;
        }
        return pages;
      }
      return state;
    default:
      return state;
  }
}
