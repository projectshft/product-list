import { SEARCH } from '../actions/index';

const defaultState = {
  items: [],
  count: null,
  page: 1,
  category: null,
  queryString: null,
  priceSort: null


}

const searchReducer = (state=defaultState, action) => {
  switch (action.type) {
    case SEARCH:
      const queryData = action.payload;

      return queryData;
    default:
      return state;
  }
}

export default searchReducer;