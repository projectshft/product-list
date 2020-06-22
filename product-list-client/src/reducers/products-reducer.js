import { FETCH_PRODUCTS } from '../actions/index'

const Default_STATE = {
  pageNumber: 'page=1', sort:'', category:'', searchInput:''
}

export default function(state = Default_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
        console.log(action.payload.data)
      return {products: action.payload.data.products, productCount: action.payload.data.productCount}
    default:
      return state;
  }
}