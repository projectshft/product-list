import {
  FETCH_PRODUCTS,
  FETCH_CATEGORY,
  FETCH_SORT,
  FETCH_SEARCHTERM,
  FETCH_PAGENUMBER,
} from "../actions";

const DEFAULT_STATE = {
  products: [],
  category: "",
  searchTerm: "",
  sort: "",
  page: null,
};

const ProductReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      if (!action.payload.data) {
        return {
          state,
        };
      }
      return {
        products: [action.payload.data],
      };
    case FETCH_CATEGORY:
      return {
        ...state,
        category: action.payload.categorycategory,
        ...state,
      };
    case FETCH_SORT:
      return {
        ...state,
        sort: action.payload.sort,
        ...state,
      };
    case FETCH_SEARCHTERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
        ...state,
      };
    case FETCH_PAGENUMBER:
      return {
        ...state,
        page: action.payload.page,
      };
    default:
      return state;
  }
};
export default ProductReducer;
