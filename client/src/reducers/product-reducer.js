import { GET_PRODUCTS, UPDATE_CATEGORY, UPDATE_PRICE} from '../actions'


const defaultState = {
  products: [],
  page: 1,
  category: '',
  price: '',
  count: 0
}

//reducer takes in two things:
//1. copy of current state
//2. action

export default function(state=defaultState, action) {
  switch(action.type) {
    case GET_PRODUCTS:
    console.log(action.payload.data)
      return {...state, products: action.payload.data.products, count: action.payload.data.count}
    case UPDATE_CATEGORY:
      return {...state, category: action.payload}
    case UPDATE_PRICE:
      return {...state, price: action.payload}
    default:
      return state;
    }
}