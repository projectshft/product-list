import {
  GET_DATA_REQUEST,
  GET_DATA_FAILURE,
  GET_DATA_SUCCESS,
  FETCH_PRODUCTS
} from '../actions/index'


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

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data;
    default:
      return state;
  }
}

//PROP TYPES //
