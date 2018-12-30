import { FETCH_PRODUCTS } from "../actions";

const initialState = {
  categories: [],
  current_page: 1,
  number_items: 0,
  number_pages: 0,
  products: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {...state, ...action.payload.data};
    default:
      return state;
  }
}