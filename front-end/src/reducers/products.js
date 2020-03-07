import { FETCH_PRODUCTS } from '../actions/index';

// Reducer for the product list

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.products,
        total: action.total,
        limit: action.limit,
        page: action.page,
        pages: action.pages
      };
    default:
      return state;
  }
}


// import { FETCH_MAKEUP, RESET_MAKEUP } from '../actions/index';

// export default function(state = [], action) {
//   switch (action.type) {
//     //reset the state everytime we run the didthecomponentmount
//     case RESET_MAKEUP:
//       return []
//     case FETCH_MAKEUP:
//       // if(action.payload.data.id === )
//       return state.concat([action.payload.data]);
//     default:
//       return state;
//   }
// }
