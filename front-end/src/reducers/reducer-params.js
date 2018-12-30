import { UPDATE_PARAMS } from "../actions";

const initialState = {
  category: "",
  price: "",
  search: "",
  page: 1
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PARAMS:
      return {...state, ...action.payload};
    default:
      return state;
  }
}