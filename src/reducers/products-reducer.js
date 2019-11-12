import { FETCH_PRODUCTS } from "../actions";

const DEFAULT_STATE = { productsList: [], numPages: 0, pageNum: 0 };

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      if (action.payload) {
        //calculate number of pages
        let { productCount, perPage } = action.payload.data;
        let pages = productCount / perPage;
        if (productCount % perPage > 0) {
          pages++;
        }

        return {
          productsList: action.payload.data.products.slice(0),
          numPages: pages,
          pageNum: action.payload.data.page
        };
      }
      return state;
    default:
      return state;
  }
}
