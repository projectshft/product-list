import { FETCH_CATEGORIES } from '../actions';

const categoriesReducer = (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCH_CATEGORIES:
      return payload.data;
    default:
      return state;
  }
};

export default categoriesReducer;
