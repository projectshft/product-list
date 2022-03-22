import { PAGE_SET, QUERY_SET, CATEGORY_SET, PRICE_SORT_SET } from '../actions';


const defaultState = {
  page: '1',
  query: '',
  category: '',
  priceSort: ''
}

const searchSettingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case PAGE_SET:
      return {...state, page: action.payload}
    case QUERY_SET:
      return {...state, query: action.payload}
    case CATEGORY_SET:
      return {...state, query: action.payload}
    case PRICE_SORT_SET:
      return {...state, query: action.payload}
    default:
      return defaultState;
  }
}

export default searchSettingsReducer;