import { FETCH_PRODUCTS } from '../actions/index';

const DEFAULT_STATE = {};
// eslint-disable-next-line default-param-last
const ProductReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      debugger;
      return {
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export { ProductReducer };
