import { GET_PRODUCTS } from '../actions'
import { SORT } from '../actions'
import { FILTER_BY_CATEGORY } from '../actions'

const defaultState = {
  products: [],
  sort: null,
  category: null, 
  page: 1
}

//reducer takes in two things:
//1. action
//2. copy of current state

export default function(state=defaultState, action) {
  switch(action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.payload.data}
    case SORT: 
      return {...state, products: action.payload.data}
    case FILTER_BY_CATEGORY:
      return {...state, products: action.payload.data}
    default:
      return state;
    }
}