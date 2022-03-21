import { FETCH_PRODUCTS } from '../actions';

const ReducerMain = (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCH_PRODUCTS:
      return payload.data;
    default:
      return state;
  }
};

export default ReducerMain;
