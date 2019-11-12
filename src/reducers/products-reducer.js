import { FETCH_PRODUCTS } from "../actions";

const DEFAULT_STATE = {
  productsList: [],
  numPages: 0,
  pageNum: 0,
  query: "",
  sort: "Price: Low to High",
  category: ""
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      if (action.payload) {
        let newState = Object.assign({}, state);

        //calculate number of pages
        let { productCount, perPage } = action.payload.data;
        let pages = productCount / perPage;
        if (productCount % perPage > 0) {
          pages++;
        }

        newState.productsList = action.payload.data.products.slice(0);
        newState.numPages = pages;
        newState.pageNum = Number(action.payload.data.page);

        return newState;
      }
      return state;
    default:
      return state;
  }
}
