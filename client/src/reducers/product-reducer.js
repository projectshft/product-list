import { GET_PRODUCTS } from '../actions/types'
import { SORT } from '../actions/types'
import { FILTER_BY_CATEGORY } from '../actions/types'

const defaultState = {
  products: [],
  sort: null,
  categories: [],

}

//reducer takes in two things:
//1. action
//2. copy of current state

export default function(state=defaultState, action) {
  switch(action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.payload.data}
    case SORT: 
      return {...state, ...action.payload.data}
    case FILTER_BY_CATEGORY:
      return {...state, ...action.payload.data}
    default:
      return state;
    }
}