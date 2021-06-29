import { PAGE_NUM, NAME, CATEGORY, PRICE_TYPE} from '../actions/action-names'

const INITIAL_STATE = {
  pageNumber: 1,
  name: '',
  category: '',
  priceType: ''
}

export const FilterReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case PAGE_NUM:
      return {
        ...state, 
        pageNumber: action.payload,
      }
      default:
        return state

    case NAME:
      return {
        ...state, 
        name: action.payload
      }
    
    case CATEGORY:
      return {
        ...state, 
        category: action.payload
      }
      
    case PRICE_TYPE:
      return {
        ...state, 
        priceType: action.payload
      }
  }
}
