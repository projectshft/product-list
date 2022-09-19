import { FETCH_PRODUCTS } from '../actions/index';

const DEFAULT_STATE = { data: {}, previousQuery: {} };
// eslint-disable-next-line default-param-last
const ProductReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        data: action.payload.data.data,
        previousQuery: action.payload.query,
      };
    default:
      return state;
  }
};

export { ProductReducer };
