import { FETCH_PRODUCTS } from '../actions/index'



export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data;
    default:
      return state;
  }
}

//PROP TYPES //



    // case GET_DATA_REQUEST: {
    //   return {
    //     ...state,
    //     status: 'fetching'
    //   }
    // }
    // case GET_DATA_SUCCESS: {
    //   return {
    //     ...state,
    //     status: 'success'
    //   }
    // }
    // case GET_DATA_FAILURE: {
    //   return {
    //     ...state,
    //     status: 'failure'
    //   }