import { FETCH_PRODUCTS, FETCH_SEARCH } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log('action.payload.data', action.payload.data)
      state = []
      return state.concat([action.payload.data]);
    case FETCH_SEARCH:
      state = []
      return state.concat([action.payload.data]);
        default:
          return state;
  }
}
