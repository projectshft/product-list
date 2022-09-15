import { COMBO_FILTER, FETCH_PRODUCT } from '../action';

const defaultState = [];

const ProductReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.payload.data.products;
    default:
      return state;
  }
};

const ComboReducer = (state = defaultState, action) => {
  switch (action.type) {
    case COMBO_FILTER:
      // return action.payload.data.products;
      return action.payload.data;
    default:
      return state;
  }
};

// const defaultQueryState = {
//   currentPage: 0,
// category: "",
// price: "",
// query: ""
// }

// const QueryReducer = (state = defaultQueryState, action) => {
//   switch(action.type) {
//     case "SET_QUERY": {
//       return {
//         ...state,
//         query: action.payload
//       }
//     }
//   }
// }

const reducers = {
  ProductReducer,
  ComboReducer,
  // QueryReducer
};

export default reducers;
