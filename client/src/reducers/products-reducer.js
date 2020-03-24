  
import { FETCH_PRODUCTS } from '../actions/index'

const Default_STATE = {
  currentPage: 'page=1', sort:'', category:''
}

export default function(state = Default_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {...state, products: action.payload.data.products, count: action.payload.data.count }
    default:
      return state;
  }
}
